import { Button, Typography, message } from "antd";
// import { executeCode } from "../api";
import  Worker from "../worker.ts?worker";
import { Language } from "../constant.ts";
import * as monaco from 'monaco-editor';
import React, { useState } from "react";

const { Text } = Typography;

interface OutputProps {
    editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
    language: Language;
}

const worker = new Worker()
const Output = ({ editorRef, language }: OutputProps) => {
    const [output, setOutput] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        const sourceCode = editorRef.current?.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            // const { run: result } = await executeCode(language, sourceCode);
            worker.postMessage({language, sourceCode})
            worker.addEventListener('message', (event) => {
                const result = event.data.run;
                setOutput(result.output.split("\n"));
                if (result.stderr) {
                    setIsError(true);
                } else {
                    setIsError(false);
                }
            })

        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) message.error(error.message || "Unable to run code");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ width: "50%" }}>
            <Text style={{ marginBottom: '8px', fontSize: '16px', color: 'gray' }}>
                Output
            </Text>
            <br /><br />
            <Button
                color="primary" variant="dashed"
                loading={isLoading}
                style={{ marginBottom: '16px' }}
                onClick={runCode}
            >
                Run Code
            </Button>
            <div
                style={{
                    height: "73vh",
                    width: '48vw',
                    padding: '8px',
                    color: isError ? "red" : "",
                    border: "1px solid",
                    borderRadius: '4px',
                    borderColor: isError ? "red" : "#333",
                }}
            >
                {output
                    ? output.map((line, i) => <Text key={i}>{line}</Text>)
                    : 'Click "Run Code" to see the output here'}
            </div>
        </div>
    );
};

export default Output;
