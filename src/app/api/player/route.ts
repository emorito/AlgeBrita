import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Crear o obtener jugador
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    // Buscar jugador existente
    let player = await db.player.findUnique({
      where: { name }
    });

    // Crear nuevo jugador si no existe
    if (!player) {
      player = await db.player.create({
        data: { name, coins: 0 }
      });
    }

    return NextResponse.json({
      success: true,
      player: {
        id: player.id,
        name: player.name,
        coins: player.coins
      }
    });
  } catch (error) {
    console.error('Error al crear jugador:', error);
    return NextResponse.json(
      { error: 'Error al crear jugador' },
      { status: 500 }
    );
  }
}

// Obtener jugador
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    const player = await db.player.findUnique({
      where: { name },
      include: {
        progress: true
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
    console.error('Error al obtener jugador:', error);
    return NextResponse.json(
      { error: 'Error al obtener jugador' },
      { status: 500 }
    );
  }
}
