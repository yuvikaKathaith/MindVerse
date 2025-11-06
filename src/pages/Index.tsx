import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  Activity,
  TrendingUp,
  Brain,
  Users,
  Target,
  AlertCircle,
  Info,
  Mail,
  Send,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HRV Stress Monitor
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
            {isLoggedIn ? (
              <Button variant="hero" size="sm" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block p-3 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <Heart className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Real-Time Stress Monitoring
          </h1>
          <p className="text-2xl text-muted-foreground">
            Using ECG-based Heart Rate Variability (HRV)
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Affordable, Portable, Non-Invasive Stress Monitoring System
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Start Monitoring
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section id="about" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Background</h2>
            <p className="text-muted-foreground">Understanding the stress crisis</p>
          </div>
          
          <Card className="shadow-medium border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                The Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Stress has become a pervasive issue affecting millions worldwide, with significant impacts on physical and mental health, productivity, and overall quality of life.
              </p>
              <p>
                Current stress monitoring methods are largely subjective, relying on self-reported questionnaires that lack real-time insights and objective measurements.
              </p>
              <p>
                Without continuous monitoring, individuals often fail to recognize stress patterns until symptoms become severe, missing critical opportunities for early intervention.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-6 py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-large border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Info className="h-6 w-6 text-primary" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-lg">
                Existing stress tracking methods are subjective and lack real-time physiological analysis, preventing individuals from identifying stress patterns early and taking preventive measures.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-card border border-border/50">
                  <h4 className="font-semibold mb-2 text-destructive">Current Limitations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Subjective self-assessments</li>
                    <li>• No real-time data</li>
                    <li>• Delayed intervention</li>
                    <li>• Limited pattern recognition</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border/50">
                  <h4 className="font-semibold mb-2 text-primary">Our Solution</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Objective ECG measurements</li>
                    <li>• Continuous monitoring</li>
                    <li>• Early detection</li>
                    <li>• AI-powered insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Importance */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why It Matters</h2>
            <p className="text-muted-foreground">The importance of real-time stress monitoring</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-soft hover:shadow-medium transition-shadow border-border/50">
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Prevention</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Early detection of stress patterns enables proactive intervention before symptoms escalate into serious health issues.
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-shadow border-border/50">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Wellness</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Continuous monitoring empowers individuals to understand their stress triggers and develop healthier coping mechanisms.
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-shadow border-border/50">
              <CardHeader>
                <Activity className="h-8 w-8 text-secondary mb-2" />
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Affordable and portable technology makes professional-grade stress monitoring accessible to everyone.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Objectives */}
      <section id="features" className="container mx-auto px-6 py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Main Objectives</h2>
            <p className="text-muted-foreground">How our system helps students and professionals</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-medium border-primary/20">
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Early Stress Identification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Real-time HRV analysis detects stress patterns before they become overwhelming, allowing for timely intervention.</p>
                <p className="font-medium text-foreground">Benefits: Reduced anxiety, better mental health, prevented burnout</p>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-accent/20">
              <CardHeader>
                <Brain className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Improved Focus & Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Understanding stress patterns helps optimize study schedules and work routines for peak cognitive performance.</p>
                <p className="font-medium text-foreground">Benefits: Better concentration, enhanced productivity, improved academic results</p>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-secondary/20">
              <CardHeader>
                <Activity className="h-8 w-8 text-secondary mb-2" />
                <CardTitle>Personalized Wellness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>AI-powered insights provide personalized recommendations based on individual stress patterns and recovery rates.</p>
                <p className="font-medium text-foreground">Benefits: Tailored stress management, better sleep, healthier lifestyle</p>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Long-term Health Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Continuous data collection enables trend analysis and helps build sustainable stress management habits.</p>
                <p className="font-medium text-foreground">Benefits: Informed decisions, preventive healthcare, lasting wellness</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Visualization Preview */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Interactive Data Visualization</h2>
            <p className="text-muted-foreground">Comprehensive insights at your fingertips</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft border-border/50">
              <CardHeader>
                <CardTitle>Real-Time Analytics</CardTitle>
                <CardDescription>Track your stress levels throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <Activity className="h-16 w-16 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-border/50">
              <CardHeader>
                <CardTitle>HRV Trends</CardTitle>
                <CardDescription>Monitor your heart rate variability patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-secondary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              View Your Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Team & Contact */}
      <section id="contact" className="container mx-auto px-6 py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">Have questions? We'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-semibold">Research Team</p>
                  <p className="text-muted-foreground">Biomedical Engineering & Data Science</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-semibold">Development Team</p>
                  <p className="text-muted-foreground">Software Engineering & AI/ML</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-semibold">Clinical Advisors</p>
                  <p className="text-muted-foreground">Cardiology & Mental Health</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." rows={4} required />
                  </div>
                  <Button type="submit" className="w-full" variant="hero">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">HRV Stress Monitor</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Real-Time Stress Monitoring Project. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
