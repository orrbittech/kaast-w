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
    if (!vapi) return;

    const onSpeechStart = () => setIsSpeechActive(true);
    const onSpeechEnd = () => setIsSpeechActive(false);
    const onCallStart = () => setCallStatus("active");
    const onCallEnd = () => setCallStatus("inactive");
    const onMessage = (message: { type?: string; role?: string; transcript?: string }) => {
      if (message.type === "transcript" && message.role && message.transcript) {
        setMessages((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    };
    const onError = (e: unknown) => {
      setCallStatus("inactive");
      setError(e instanceof Error ? e.message : "An error occurred");
      console.error("[Vapi]", e);
    };

    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);

    return () => {
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
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
