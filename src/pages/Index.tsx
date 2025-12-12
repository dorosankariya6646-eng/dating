import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChatAgent } from '@/components/ChatAgent';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, MessageCircle, Shield, Sparkles, ArrowRight, LogOut, User } from 'lucide-react';

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (!user) {
      navigate('/auth');
    } else {
      setShowChat(true);
    }
  };

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
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    <User className="h-4 w-4 inline mr-1" />
                    {user.email}
                  </span>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </header>

          {/* Main content */}
          <div className="max-w-4xl mx-auto text-center">
            {!showChat ? (
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
                    onClick={handleStartChat}
                    className="group"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {user ? 'Start Chatting' : 'Sign Up to Chat'}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {user ? 'Ready to chat!' : 'Free account required'}
                </p>
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
                
                <ChatAgent />
                
                <Button
                  variant="ghost"
                  className="mt-8 text-muted-foreground"
                  onClick={() => setShowChat(false)}
                >
                  ← Back to home
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      {!showChat && (
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
