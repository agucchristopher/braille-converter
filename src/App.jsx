"use client";

import {
  Icon,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  Title,
  Flex,
  Select,
  SelectItem,
  MultiSelect,
  MultiSelectItem,
  Text,
  Metric,
  Card,
  Grid,
  Col,
  DonutChart,
  Tab,
  TabPanel,
  TabGroup,
  TabList,
  ProgressBar,
  AreaChart,
  LineChart,
  BarChart,
  TextInput,
} from "@tremor/react";
import {
  ArrowNarrowUpIcon,
  ChartPieIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  PresentationChartLineIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import Tesseract from "tesseract.js";
// export type SalesPerson = {
//   name: string;
//   leads: number;
//   sales: string;
//   quota: string;
//   variance: string;
//   region: string;
//   status: string;
// };
export const users = [
  {
    name: "Active",
    value: 300,
  },
  {
    name: "InActive",
    value: 154,
  },
  {
    name: "Disabled",
    value: 85,
  },
];
export const stats = [
  {
    month: "may",
    profit: 400,
    loss: 200,
  },
  {
    month: "june",
    profit: 250,
    loss: 600,
  },
  {
    month: "july",
    profit: 350,
    loss: 400,
  },
  {
    month: "august",
    profit: 550,
    loss: 200,
  },
  {
    month: "july",
    profit: 800,
    loss: 200,
  },
];
export const monthlystats = [
  {
    day: 1,
    profit: 160,
    loss: 20,
  },
  {
    day: 2,
    profit: 100,
    loss: 60,
  },
  {
    day: 3,
    profit: 220,
    loss: 40,
  },
  {
    day: 4,
    profit: 60,
    loss: 20,
  },
  {
    day: 5,
    profit: 260,
    loss: 60,
  },
];
const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;
export const salesPeople = [
  {
    name: "Peter Doe",
    email: "peter@gmail.com",
    gender: "male",
    status: "active",
  },
  {
    name: "Lena Whitehouse",
    email: "peter@gmail.com",
    gender: "male",
    status: "active",
  },
  {
    name: "Phil Less",
    email: "peter@gmail.com",
    gender: "male",
    status: "inactive",
  },
  {
    name: "John Camper",
    email: "peter@gmail.com",
    gender: "male",
    status: "active",
  },
  {
    name: "Max Balmoore",
    email: "peter@gmail.com",
    gender: "male",
    status: "active",
  },
];

const deltaTypes = {
  average: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};

export default function SalesPeopleTable() {
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
      <h2 className="m-4">Braiile Language Converter</h2>
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
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const inputText = "Hello, World!";
                  const brailleText = convertToBraille(text);
                  setResult(brailleText);
                  console.log(brailleText);
                }}
                className="bg-[lightgreen]"
              >
                <RefreshIcon height={30} color="#ffd" />
              </button>
            </div>
          </Card>
        </Col>
        <Card>
          <Metric className="m-4">Result</Metric>
          <div className="inline-flex w-full text-slate-50">{result}</div>
        </Card>
        {/* <Card className={"hover:shadow-sm shadow-grey-200"}>
          <Text title="Your account balance">Users</Text>
          <Metric>Users</Metric>
          <br />
          <BarChart
            noDataText="No data!"
            defaultValue={20}
            colors={["green", "pink", "red"]}
            data={users}
            category="value"
            title="Users"
          />
        </Card> */}
        <Col numColSpan={1} numColSpanLg={2}>
          <Card>
            <Metric>Image Scanner</Metric>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div>{recognizedText}</div>
          </Card>
        </Col>
      </Grid>{" "}
    </div>
  );
}
