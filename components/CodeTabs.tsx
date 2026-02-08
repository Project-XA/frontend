"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Copy, Check } from "lucide-react";

interface CodeTab {
    label: string;
    language: string;
    code: string;
}

interface CodeTabsProps {
    tabs: CodeTab[];
}

export default function CodeTabs({ tabs }: CodeTabsProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const code = tabs[activeTab].code;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-md border bg-muted">
            <div className="flex items-center justify-between border-b px-2 py-1.5">
                <div className="flex items-center gap-1 overflow-x-auto">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === index
                                    ? "bg-black text-white shadow-sm"
                                    : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <Button
                    onClick={copyToClipboard}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-foreground leading-relaxed">
                    <code>{tabs[activeTab].code}</code>
                </pre>
            </div>
        </div>
    );
}
