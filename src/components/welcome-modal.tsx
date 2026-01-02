'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: (playerName: string) => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(playerName.trim().length >= 2);
  }, [playerName]);

  const handleSubmit = () => {
    if (isValid) {
      onClose(playerName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <DialogHeader>
            <div className="flex flex-col items-center mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <Image
                  src="/game-assets/mascot.png"
                  alt="Mascota"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </motion.div>
              <DialogTitle className="text-3xl font-bold text-center mt-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ¡Hola, explorador! 👋
              </DialogTitle>
              <DialogDescription className="text-center text-lg mt-2">
                ¡Bienvenido al mundo de los polinomios!
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold">
                ¿Cómo te llamas? 🎮
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre de héroe matemático"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg h-12"
                maxLength={20}
                autoFocus
              />
              {playerName.length > 0 && playerName.length < 2 && (
                <p className="text-sm text-orange-600">
                  Tu nombre debe tener al menos 2 letras 📝
                </p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-4">
                <p className="text-gray-700 text-center">
                  <span className="font-bold">💡 Tip:</span> Ingresa tu nombre para guardar
                  tu progreso y ganar monedas mientras aprendes álgebra de forma divertida
                </p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              size="lg"
              className="w-full h-14 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              ¡Comenzar Aventura! 🚀
            </Button>
          </motion.div>

          {/* Decoración con monedas */}
          <div className="absolute -top-4 -right-4 animate-float">
            <Image
              src="/game-assets/coin.png"
              alt="Moneda"
              width={50}
              height={50}
              className="drop-shadow-lg"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-float" style={{ animationDelay: '1s' }}>
            <Image
              src="/game-assets/coin.png"
              alt="Moneda"
              width={50}
              height={50}
              className="drop-shadow-lg"
            />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
