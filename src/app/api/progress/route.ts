import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Actualizar o crear progreso
export async function POST(request: NextRequest) {
  try {
    const { playerName, levelType, level, score, completed, coinsEarned } = await request.json();

    if (!playerName || !levelType || level === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Obtener jugador
    const player = await db.player.findUnique({
      where: { name: playerName }
    });

    if (!player) {
      return NextResponse.json(
        { error: 'Jugador no encontrado' },
        { status: 404 }
      );
    }

    // Buscar progreso existente
    let progress = await db.progress.findUnique({
      where: {
        playerId_levelType_level: {
          playerId: player.id,
          levelType,
          level
        }
      }
    });

    if (progress) {
      // Actualizar progreso existente
      progress = await db.progress.update({
        where: { id: progress.id },
        data: {
          score: Math.max(progress.score, score),
          completed: progress.completed || completed,
          coinsEarned: progress.coinsEarned + coinsEarned,
          attempts: progress.attempts + 1
        }
      });
    } else {
      // Crear nuevo progreso
      progress = await db.progress.create({
        data: {
          playerId: player.id,
          levelType,
          level,
          score,
          completed,
          coinsEarned,
          attempts: 1
        }
      });
    }

    // Actualizar monedas del jugador
    await db.player.update({
      where: { id: player.id },
      data: { coins: player.coins + coinsEarned }
    });

    return NextResponse.json({
      success: true,
      progress: {
        id: progress.id,
        levelType: progress.levelType,
        level: progress.level,
        score: progress.score,
        completed: progress.completed,
        coinsEarned: progress.coinsEarned,
        attempts: progress.attempts
      }
    });
  } catch (error) {
    console.error('Error al guardar progreso:', error);
    return NextResponse.json(
      { error: 'Error al guardar progreso' },
      { status: 500 }
    );
  }
}

// Obtener progreso de un jugador
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const playerName = searchParams.get('playerName');

    if (!playerName) {
      return NextResponse.json(
        { error: 'El nombre del jugador es requerido' },
        { status: 400 }
      );
    }

    const player = await db.player.findUnique({
      where: { name: playerName },
      include: {
        progress: {
          orderBy: [
            { levelType: 'asc' },
            { level: 'asc' }
          ]
        }
      }
    });

    if (!player) {
      return NextResponse.json(
        { error: 'Jugador no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      player: {
        id: player.id,
        name: player.name,
        coins: player.coins,
        progress: player.progress
      }
    });
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    return NextResponse.json(
      { error: 'Error al obtener progreso' },
      { status: 500 }
    );
  }
}
