"use client";

import {
  Title,
  Text,
  Metric,
  Card,
  Grid,
  Col,
  TextInput,
  Button,
} from "@tremor/react";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [recognizedText, setRecognizedText] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        recognizeText(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const recognizeText = (imageData) => {
    Tesseract.recognize(imageData, "eng")
      .then((result) => {
        console.log(result.data);
        setRecognizedText(result.data.text);
        setText(recognizedText);
        const brailleText = convertToBraille(recognizedText);
        setResult(brailleText);
      })
      .catch((error) => {
        console.error("Error during text recognition:", error);
      });
  };
  // Define the Braille alphabet
  const brailleAlphabet = {
    a: "⠁",
    b: "⠃",
    c: "⠉",
    d: "⠙",
    e: "⠑",
    f: "⠋",
    g: "⠛",
    h: "⠓",
    i: "⠊",
    j: "⠚",
    k: "⠅",
    l: "⠇",
    m: "⠍",
    n: "⠝",
    o: "⠕",
    p: "⠏",
    q: "⠟",
    r: "⠗",
    s: "⠎",
    t: "⠞",
    u: "⠥",
    v: "⠧",
    w: "⠺",
    x: "⠭",
    y: "⠽",
    z: "⠵",
  };

  // Function to convert a string to Braille
  function convertToBraille(text) {
    let braille = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toLowerCase();
      if (brailleAlphabet[char]) {
        braille += brailleAlphabet[char];
      } else {
        braille += char;
      }
    }
    return braille;
  }

  return (
    <div className="m-2 p-4 ">
      <Metric className="m-4">Braiile Language Converter</Metric>
      <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          <Card className={"hover:shadow-sm shadow-grey-200"}>
            <Metric className="m-4">Text</Metric>
            <div className="inline-flex w-full">
              <TextInput
                type="text"
                inputMode="text"
                onChange={(e) => {
                  setText(e.target.value);
                  console.log(e.target.value);
                  const brailleText = convertToBraille(e.target.value);
                  console.log(brailleText);
                  setResult(brailleText);
                }}
              />
            </div>
          </Card>
        </Col>
        <Card>
          <Metric className="m-4">Braille:</Metric>
          <div className="inline-flex w-full text-slate-50">
            <Metric className="font-[20px] ml-4"> {result} </Metric>{" "}
          </div>
        </Card>
        {/* <Col numColSpan={1} numColSpanLg={2}>
          <Card>
            <Metric>Image Scanner</Metric>
            <input className="m-4" type="file" accept="image/*" />
            <Metric>{recognizedText}</Metric>
            <Button onClick={handleImageUpload} className="dark:text-white ">
              Convert to braille
            </Button>
          </Card>
        </Col> */}
      </Grid>{" "}
    </div>
  );
}
