import { useState } from 'react';
import { VoiceAgent } from '@/components/VoiceAgent';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Shield, Sparkles, ArrowRight } from 'lucide-react';

const Index = () => {
  const [showAgent, setShowAgent] = useState(false);
  
  // Replace with your ElevenLabs public agent ID
  const AGENT_ID = 'your-agent-id-here';

  return (
    <div className="min-h-screen gradient-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="font-display text-xl font-semibold text-foreground">DateExpert</span>
            </div>
          </header>

          {/* Main content */}
          <div className="max-w-4xl mx-auto text-center">
            {!showAgent ? (
              <div className="animate-fade-in space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Your AI Dating Expert
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Love advice that{' '}
                  <span className="text-primary">understands</span> you
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Talk to your personal dating expert anytime. Get real, human-like advice 
                  on relationships, texting, dating apps, and matters of the heart.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button 
                    variant="hero" 
                    size="xl"
                    onClick={() => setShowAgent(true)}
                    className="group"
                  >
                    Start Talking
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-sm text-muted-foreground">Free • No signup required</p>
                </div>
              </div>
            ) : (
              <div className="py-12 animate-scale-in">
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                    Your Dating Expert
                  </h2>
                  <p className="text-muted-foreground">
                    I'm here to help. What's on your mind?
                  </p>
                </div>
                
                <VoiceAgent agentId={AGENT_ID} />
                
                <Button
                  variant="ghost"
                  className="mt-8 text-muted-foreground"
                  onClick={() => setShowAgent(false)}
                >
                  ← Back to home
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      {!showAgent && (
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why talk to DateExpert?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get personalized dating advice from an AI that truly understands relationships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={MessageCircle}
              title="Natural Conversations"
              description="Talk like you would with a real friend. No awkward menus or typing required."
            />
            <FeatureCard
              icon={Heart}
              title="Emotionally Intelligent"
              description="I adapt my tone to match your mood — calming, supportive, or energizing."
            />
            <FeatureCard
              icon={Sparkles}
              title="Expert Knowledge"
              description="Built on relationship psychology, attachment theory, and real dating patterns."
            />
            <FeatureCard
              icon={Shield}
              title="Private & Safe"
              description="Your conversations stay private. Share openly without judgment."
            />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            <span>DateExpert</span>
          </div>
          <p>Your AI-powered dating companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
