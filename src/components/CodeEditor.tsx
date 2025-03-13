import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import LanguageSelector from "./LanguageSelector.tsx";
import Output from "./Output.tsx";
import { Row, Col } from 'antd';
import { CODE_SNIPPETS, Language } from "../constant.ts";

export function CodeEditor() {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState<Language>("javascript");

    const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language: Language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };
    return (
        <>
            <Row style={{ height: '100vh' }}>
                <Col span={12}>
                    <LanguageSelector language={language} onSelect={onSelect} />
                    <Editor
                        options={{
                            minimap: {
                                enabled: false,
                            },
                        }}
                        height="75vh"
                        theme="vs-dark"
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={(value) => setValue(value as string)}
                    />
                </Col>

                <Col span={12}>
                <Output editorRef={editorRef} language={language} />
                </Col>
            </Row>
        </>
    );
}
