"use client";

import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";

export type CallStatus = "inactive" | "active" | "loading";

export interface TranscriptMessage {
  role: string;
  text: string;
}

export function useVapi() {
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("inactive");
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ?? "";
  const isConfigured = !!assistantId && !!vapi;

  useEffect(() => {
    const client = vapi;
    if (!client) return;

    const onSpeechStart = () => setIsSpeechActive(true);
    const onSpeechEnd = () => setIsSpeechActive(false);
    const onCallStart = () => setCallStatus("active");
    const onCallEnd = () => setCallStatus("inactive");
    const onMessage = (message: { type?: string; role?: string; transcript?: string }) => {
      const role = message.role;
      const transcript = message.transcript;
      if (message.type === "transcript" && role && transcript) {
        setMessages((prev) => [
          ...prev,
          { role, text: transcript },
        ]);
      }
    };
    const onError = (e: unknown) => {
      setCallStatus("inactive");
      setError(e instanceof Error ? e.message : "An error occurred");
      console.error("[Vapi]", e);
    };

    client.on("speech-start", onSpeechStart);
    client.on("speech-end", onSpeechEnd);
    client.on("call-start", onCallStart);
    client.on("call-end", onCallEnd);
    client.on("message", onMessage);
    client.on("error", onError);

    return () => {
      client.off("speech-start", onSpeechStart);
      client.off("speech-end", onSpeechEnd);
      client.off("call-start", onCallStart);
      client.off("call-end", onCallEnd);
      client.off("message", onMessage);
      client.off("error", onError);
    };
  }, []);

  const start = async () => {
    if (!vapi || !assistantId) return;
    setError(null);
    setMessages([]);
    setCallStatus("loading");
    try {
      await vapi.start(assistantId);
    } catch (e) {
      setCallStatus("inactive");
      setError(e instanceof Error ? e.message : "Failed to start call");
    }
  };

  const stop = () => {
    if (!vapi) return;
    setCallStatus("loading");
    vapi.stop();
  };

  const toggleCall = () => {
    if (callStatus === "active") {
      stop();
    } else {
      start();
    }
  };

  return {
    isSpeechActive,
    callStatus,
    messages,
    error,
    isConfigured,
    isConnected: callStatus === "active",
    start,
    stop,
    toggleCall,
  };
}
