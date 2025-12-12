import { useConversation } from '@elevenlabs/react';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, PhoneOff, Heart } from 'lucide-react';

interface VoiceAgentProps {
  agentId: string;
}

export function VoiceAgent({ agentId }: VoiceAgentProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [inputVolume, setInputVolume] = useState(0);
  const [outputVolume, setOutputVolume] = useState(0);

  const conversation = useConversation({
    onConnect: () => console.log('Connected to dating expert'),
    onDisconnect: () => console.log('Disconnected from dating expert'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  // Update volume levels for visualization
  useEffect(() => {
    if (conversation.status !== 'connected') return;

    const interval = setInterval(() => {
      const input = conversation.getInputVolume?.() || 0;
      const output = conversation.getOutputVolume?.() || 0;
      setInputVolume(input);
      setOutputVolume(output);
    }, 100);

    return () => clearInterval(interval);
  }, [conversation.status, conversation]);

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Using agentId for public agents (no auth required)
      await conversation.startSession({
        agentId: agentId,
        connectionType: 'webrtc',
      } as any);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Main voice orb */}
      <div className="relative">
        {/* Outer glow rings */}
        {isConnected && (
          <>
            <div 
              className="absolute inset-0 rounded-full gradient-warm opacity-20 blur-2xl"
              style={{
                transform: `scale(${1.5 + (isSpeaking ? outputVolume : inputVolume) * 0.5})`,
                transition: 'transform 0.1s ease-out',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full gradient-warm opacity-30 blur-xl animate-pulse-ring"
              style={{
                transform: `scale(${1.3 + (isSpeaking ? outputVolume : inputVolume) * 0.3})`,
              }}
            />
          </>
        )}

        {/* Main orb button */}
        <Button
          variant={isConnected ? "voiceActive" : "voice"}
          size="iconXl"
          onClick={isConnected ? stopConversation : startConversation}
          disabled={isConnecting}
          className="relative z-10 transition-all duration-300"
          style={{
            transform: isConnected 
              ? `scale(${1 + (isSpeaking ? outputVolume : inputVolume) * 0.1})` 
              : 'scale(1)',
          }}
        >
          {isConnecting ? (
            <div className="h-8 w-8 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : isConnected ? (
            <PhoneOff className="h-8 w-8" />
          ) : (
            <Phone className="h-8 w-8" />
          )}
        </Button>
      </div>

      {/* Status text */}
      <div className="text-center space-y-2 animate-fade-in">
        {isConnected ? (
          <>
            <div className="flex items-center justify-center gap-2">
              {isSpeaking ? (
                <>
                  <Heart className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Your expert is speaking...</span>
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Listening to you...</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Tap to end conversation</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground">
              {isConnecting ? 'Connecting...' : 'Ready to talk'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isConnecting ? 'Please wait' : 'Tap to start your session'}
            </p>
          </>
        )}
      </div>

      {/* Volume indicator bars */}
      {isConnected && (
        <div className="flex items-center justify-center gap-1 h-12">
          {[...Array(7)].map((_, i) => {
            const volume = isSpeaking ? outputVolume : inputVolume;
            const threshold = (i + 1) / 7;
            const isActive = volume > threshold * 0.5;
            
            return (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-100"
                style={{
                  height: `${20 + Math.random() * 20 + (isActive ? volume * 30 : 0)}px`,
                  backgroundColor: isActive 
                    ? 'hsl(var(--primary))' 
                    : 'hsl(var(--muted))',
                  opacity: isActive ? 0.8 + volume * 0.2 : 0.3,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
