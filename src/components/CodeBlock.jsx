import React, { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import glsl from "highlight.js/lib/languages/glsl";

import './CodeBlock.css'
import "highlight.js/styles/monokai.css";



export const CodeBlock = (props) => {
    const {language, code} = props
    useEffect(()=>{
        hljs.highlightAll()
    }, [props.code])
    return(
        <pre>
            <code className={language}>
                {code}
            </code>
        </pre>

    )
}