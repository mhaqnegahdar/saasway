"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Download, Edit, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockTranscript = [
  { id: "1", speaker: "AI", text: "Hi! Thanks for joining the Clarity Call. I'm here to help you validate and refine your SaaS idea.", timestamp: "0:00" },
  { id: "2", speaker: "You", text: "I want to build an AI-powered email assistant that helps busy professionals manage their inbox.", timestamp: "0:15" },
  { id: "3", speaker: "AI", text: "Great! Let me ask you some questions to help clarify your vision. Who specifically are you targeting?", timestamp: "0:30" },
  { id: "4", speaker: "You", text: "Primarily executives and managers who receive 100+ emails per day.", timestamp: "0:45" },
];

const mockChat = [
  { id: "1", sender: "user", text: "Can you explain more about the market analysis?" },
  { id: "2", sender: "ai", text: "Of course! Based on our conversation, the email management market is highly competitive but still has gaps. Your focus on AI-powered prioritization is a strong differentiator..." },
];

const CallDetail = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState("prd");
  const [selectedVersion, setSelectedVersion] = useState("v1");
  const [chatInput, setChatInput] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <Link href="/project/1">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">Clarity Call</h1>
                <p className="text-sm text-muted-foreground">AI Email Assistant</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            <Tabs defaultValue="transcript" className="space-y-6">
              <TabsList>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
                <TabsTrigger value="docs">Docs</TabsTrigger>
              </TabsList>

              <TabsContent value="transcript">
                <Card className="p-6">
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transcript..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {mockTranscript.map((entry) => (
                        <div
                          key={entry.id}
                          className={`p-4 rounded-lg ${
                            entry.speaker === "AI"
                              ? "bg-primary/5 border-l-2 border-primary"
                              : "bg-secondary/5 border-l-2 border-secondary"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{entry.speaker}</span>
                            <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                          </div>
                          <p className="text-sm">{entry.text}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </TabsContent>

              <TabsContent value="chat">
                <Card className="flex flex-col h-[700px]">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">
                      Ask questions about your call or project
                    </p>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {mockChat.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-2xl ${
                              msg.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask a question..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                      />
                      <Button>Send</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="next-steps">
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Is it Ready to Build?</h3>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="font-medium text-primary mb-2">✓ Yes, with some refinements</p>
                      <p className="text-sm text-muted-foreground">
                        Your core concept is solid and addresses a clear market need. The AI assistant for email
                        management has strong potential, especially with your focus on executives and managers.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Gaps to Fill</h3>
                    <div className="space-y-3">
                      {[
                        "Define specific AI capabilities and how they differ from existing solutions",
                        "Clarify integration requirements with major email providers",
                        "Determine pricing model and customer acquisition strategy",
                        "Address data privacy and security concerns",
                      ].map((gap, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                          <div className="h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-sm">{gap}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Suggested Next Call</h3>
                    <p className="text-muted-foreground mb-4">
                      Ready to dive deeper? Your Strategy Call will cover technical implementation, architecture
                      decisions, and create detailed documentation for your development team.
                    </p>
                    <Button asChild size="lg">
                      <Link href="/project/1">Schedule Strategy Call</Link>
                    </Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="docs">
                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1 space-y-4">
                    <Card className="p-4">
                      <Label className="text-sm font-medium mb-2 block">Document Type</Label>
                      <Select value={selectedDoc} onValueChange={setSelectedDoc}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prd">Product Requirements (PRD)</SelectItem>
                          <SelectItem value="tech">Technical Proposal</SelectItem>
                        </SelectContent>
                      </Select>
                    </Card>

                    <Card className="p-4">
                      <Label className="text-sm font-medium mb-2 block">Version</Label>
                      <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">Version 1.0</SelectItem>
                          <SelectItem value="v2">Version 2.0</SelectItem>
                          <SelectItem value="v3">Version 3.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </Card>

                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                          <Button className="w-full">
                            <Edit className="mr-2 h-4 w-4" />
                            Make Changes
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>AI Document Assistant</SheetTitle>
                            <SheetDescription>
                              Describe the changes you&apos;d like to make
                            </SheetDescription>
                          </SheetHeader>
                          <div className="flex flex-col h-full py-6">
                            <ScrollArea className="flex-1 mb-4">
                              <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-muted">
                                  <p className="text-sm">How can I help you improve this document?</p>
                                </div>
                              </div>
                            </ScrollArea>
                            <div className="flex gap-2">
                              <Input placeholder="Describe your changes..." />
                              <Button>Send</Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <Card className="p-8">
                      <div className="prose prose-sm max-w-none">
                        <h1 className="flex items-center gap-2 mb-6">
                          <FileText className="h-6 w-6 text-primary" />
                          Product Requirements Document
                        </h1>
                        <h2>Executive Summary</h2>
                        <p>
                          The AI Email Assistant is a SaaS platform designed to help busy executives and managers
                          efficiently manage their inbox through intelligent automation and prioritization.
                        </p>

                        <h2>Problem Statement</h2>
                        <p>
                          Modern professionals receive an overwhelming number of emails daily (100+), leading to:
                        </p>
                        <ul>
                          <li>Missed important communications</li>
                          <li>Decreased productivity due to email overload</li>
                          <li>Increased stress and decision fatigue</li>
                        </ul>

                        <h2>Proposed Solution</h2>
                        <p>
                          An AI-powered assistant that automatically categorizes, prioritizes, and suggests responses
                          to incoming emails based on learned patterns and explicit user preferences.
                        </p>

                        <h2>Key Features</h2>
                        <ul>
                          <li>Smart email categorization and filtering</li>
                          <li>Priority inbox with AI-driven importance scoring</li>
                          <li>Auto-response suggestions for common queries</li>
                          <li>Integration with major email providers (Gmail, Outlook)</li>
                          <li>Customizable rules and preferences</li>
                        </ul>

                        <h2>Target Audience</h2>
                        <p>
                          Primary: C-level executives, senior managers, and business leaders
                          <br />
                          Secondary: Sales professionals and customer success teams
                        </p>

                        <h2>Success Metrics</h2>
                        <ul>
                          <li>Reduce email processing time by 40%</li>
                          <li>Achieve 90% accuracy in priority detection</li>
                          <li>Generate 80% user satisfaction rating</li>
                        </ul>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default CallDetail;
