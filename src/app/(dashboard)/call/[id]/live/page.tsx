"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { WaveformVisualizer } from "@/components/WaveformVisualizer";
import { Mic, MicOff, PhoneOff, Signal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";

const mockTranscript = [
  { speaker: "AI", text: "Hi! Thanks for joining the Clarity Call. I'm here to help you validate and refine your SaaS idea. Let's start with the basics - can you tell me about your idea in your own words?" },
  { speaker: "You", text: "I want to build an AI-powered email assistant that helps busy professionals manage their inbox more efficiently." },
  { speaker: "AI", text: "Great! That's a solid starting point. Let me ask you some questions to help clarify your vision. Who specifically are you targeting with this product?" },
  { speaker: "You", text: "Primarily executives and managers who receive 100+ emails per day and struggle to keep up." },
];

const LiveCall = () => {
  const { id } = useParams();
//   const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [transcript, setTranscript] = useState(mockTranscript);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");

  const handleEndCall = () => {
    // Simulate ending call and processing
    // navigate(`/call/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Clarity Call in Progress</h1>
              <p className="text-sm text-muted-foreground">AI Email Assistant</p>
            </div>
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-primary" />
              <Badge variant={connectionStatus === "connected" ? "default" : "outline"}>
                {connectionStatus === "connected" ? "Connected" : "Connecting..."}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        {/* Center - Waveform */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-8">
          <div className="w-full max-w-2xl">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">
                    {isActive ? "AI is speaking..." : "Listening..."}
                  </h2>
                  <p className="text-muted-foreground">
                    Speak naturally - the AI will ask questions to understand your vision
                  </p>
                </div>

                <div className="h-48 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 overflow-hidden">
                  {/* <WaveformVisualizer isActive={isActive} /> */}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 pt-4">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="icon"
                    className="h-14 w-14 rounded-full"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-16 w-16 rounded-full"
                    onClick={handleEndCall}
                  >
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {isMuted ? "Microphone muted" : "Microphone active"}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Right - Live Transcript */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Live Transcript</h3>
              <p className="text-sm text-muted-foreground">Real-time conversation</p>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {transcript.map((entry, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg ${
                      entry.speaker === "AI"
                        ? "bg-primary/10 border-l-2 border-primary"
                        : "bg-secondary/10 border-l-2 border-secondary"
                    }`}
                  >
                    <div className="font-medium text-xs mb-1">{entry.speaker}</div>
                    <div className="text-sm">{entry.text}</div>
                  </div>
                ))}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveCall;
