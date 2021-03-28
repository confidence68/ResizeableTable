import React,{PureComponent} from "react";
import ReactDOM from "react-dom";
import ResizeableTable from './component/ResizeableTable'

const data1 = [
  {
    key: 0,
    date: "2018-02-11",
    amount: 120,
    type: "income",
    note: "transfer",
    money:1000,
    cost:1000,
    cpm:1000,
    cpc:1000,
  },
  {
    key: 1,
    date: "2018-03-11",
    amount: 243,
    type: "income",
    note: "transfer",
    money:600,
    cost:500,
    cpm:10000,
    cpc:4543,
  },
  {
    key: 2,
    date: "2018-04-11",
    amount: 98,
    type: "income",
    note: "transfer",
    money:6700,
    cost:50770,
    cpm:100600,
    cpc:3333,
  }
];


const columns1 = [
  {
    title: "Date",
    dataIndex: "date",
    width: 200,
    sorter: (a, b) => a.date.length - b.date.length,
    sortDirections: ["descend"]
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 100,
    sorter: (a, b) => {
      console.log("Amount sort");
      return a.amount - b.amount;
    },
    sortDirections: ["descend"]
  },
  {
    title: "Type",
    dataIndex: "type",
    width: 100
  },
  {
    title: "Note",
    dataIndex: "note",
    width: 100
  },
  {
    title: "Date",
    dataIndex: "date",
    width: 200,
    sorter: (a, b) => a.date.length - b.date.length,
    sortDirections: ["descend"]
  },
  {
    title: "money",
    dataIndex: "money",
    width: 100,
    sorter: (a, b) => {
      console.log("Amount sort");
      return a.money - b.money;
    }
  },
  {
    title: "cpc",
    dataIndex: "cpc",
    sorter:true,
    width: 100
  },
  {
    title: "cpm",
    sorter:true,
    width: 150
  },
  {
    title: "Action",
    key: "action",
    render: () => <a href="javascript:;">Delete</a>
  }
];


class TableResize extends PureComponent {
  state = {
    idx: 0
  };


  render() {
    const curData = data1;
    const curColumns = columns1;

    return (
      <div className="App">
        <ResizeableTable
          columns={curColumns}
          dataSource={curData}
        />
      </div>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<TableResize />, rootElement);

