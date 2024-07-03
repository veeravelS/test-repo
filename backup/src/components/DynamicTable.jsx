import { useEffect, useState } from "react";
import TableRows from "./TableRows";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useKeypress from "../hooks/useKeyPress";
import { dynamicTable } from "../constants/KeysConfig";



const DynamicTable = () => {
  const [rowsData, setRowsData] = useState([{
    desc: "",
    qty: 0,
    unit: 0,
    price:0
  }]);


console.log(rowsData)

  const addTableRows = (e) => {
    if(rowsData[rowsData.length-1].price !=0){
    const rowsInput = {
        desc: "",
        qty: 0,
        unit: 0,
        price:0
    };
    setRowsData([...rowsData, rowsInput]);
  }else{
    var inputs = document.getElementsByClassName('MuiInput-input');
        for (var i = rowsData.length == 1?0:((rowsData.length-1)*4); i < inputs.length; i++) {
        if (document.activeElement.id == inputs[i].id && i+1 < inputs.length ) {
            inputs[(i+1)].focus();
            break;   
        }
    }
  }
  };



  useKeypress(dynamicTable.ADDROW,()=> {
    document.getElementById("addTableRows").click();
  });

  
  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  
  
  

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  
  
  const invoiceSubtotal = subtotal(rowsData);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    rowsInput[index]["price"] = rowsInput[index]["unit"]*rowsInput[index]["qty"];
    setRowsData(rowsInput);
  };


  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };



  return (
        <TableContainer component={Paper}>
            <button style={{display:'none'}} className="btn btn-outline-success" id="addTableRows" onClick={addTableRows} >+</button>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
            <TableBody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
              <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  );
};
export default DynamicTable;
