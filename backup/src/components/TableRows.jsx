import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function TableRows({
  rowsData,
  deleteTableRows,
  handleChange,
}) {
  const names = [
    { title: "Oliver Hansen" },
    { title: "Van Henry" },
    { title: "April Tucker" },
    { title: "Ralph Hubbard" },
    { title: "Omar Alexander" },
    { title: "Carlos Abbott" },
    { title: "Miriam Wagner" },
    { title: "Bradley Wilkerson" },
    { title: "Virginia Andrews" },
    { title: "Kelly Snyder" },
  ];

  return rowsData.map((data, index) => {
    const { desc, qty, unit, price } = data;

    const defaultProps = {
      options: names,
      getOptionLabel: (option) => option.title,
    };

    const flatProps = {
      options: names.map((option) => option.title),
    };

    return (
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {/* <input
            type="text"
            value={desc}
            onChange={(evnt) => handleChange(index, evnt)}
            name="desc"
            className="form-control"
          /> */}
          <Stack spacing={1} sx={{ width: 300 }}>
            {/* <Autocomplete
              {...defaultProps}
              id="disable-close-on-select"
              selectOnFocus
              onChange={(evnt) => handleSelectChange(index, evnt)}
              renderInput={(params) => (
                <TextField {...params}  autoFocus={true} variant="standard" />
              )}
            /> */}
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Age
        </InputLabel> */}
        <NativeSelect
          onChange={(evnt) => handleChange(index, evnt)}
          autoFocus={true}
          name="desc"
        >
          { names.map((option,index) => (
            <option key={index} value={option.title}>{option.title}</option>
          ))}
          

        </NativeSelect>
      </FormControl>
    </Box>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <TextField
            id="standard-basic"
            // label="Standard"
            variant="standard"
            value={qty}
            onChange={(evnt) => handleChange(index, evnt)}
            name="qty"
            className="form-control"
          />
        </TableCell>
        <TableCell align="right">
        <TextField
            id="standard-basic"
            // label="Standard"
            variant="standard"
            value={unit}
            onChange={(evnt) => handleChange(index, evnt)}
            name="unit"
            className="form-control"
          />
        </TableCell>
        <TableCell align="right">
          {/* <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            x
          </button> */}
           <TextField
            id="standard-basic"
            // label="Standard"
            disabled
            variant="standard"
            value={price}
            onChange={(evnt) => handleChange(index, evnt)}
            name="price"
            className="form-control"
          />
        </TableCell>
      </TableRow>
    );
  });
}
export default TableRows;
