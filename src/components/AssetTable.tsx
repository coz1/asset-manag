import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import useStyles from './styles/AssetTableStyle'

const AssetTable = () => {
  const classes = useStyles();
  const [user, setUser] = useState<any>([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
    { title: 'Vorname', field: 'vorname' },
    { title: 'Nachname', field: 'nachname' },   
    { title: 'Kategorie', field: 'kategorie' },
    { title: 'Hardwaretyp', field: 'hardwaretyp' },
    { title: 'Marke', field: 'marke' },
    { title: 'Model', field: 'model' },
    { title: 'Serial', field: 'serial' },
    { title: 'Status', field: 'status' },

  ]


  //const BASE_URI = 'http://localhost:5000/api/v1/assets';   //develop
  const BASE_URI = 'https://asset-manager-1.herokuapp.com/api/v1/assets'; //production


  // let data = [
  //   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
  // ]  

  useEffect(() => {
    axios.get(`${BASE_URI}`)
      .then(res => {
        const users = res.data.data;
        setUser(users);
        // console.log(users);
      });
  }, []);



  //function for updating the existing row details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validating the data inputs
    let errorList = []

    if (errorList.length < 1) {
      axios.put(`${BASE_URI}/update/${newData.id}`, newData)
        .then(response => {
          const updateUser:any = [...user];
          const index = oldData.tableData.id;
          updateUser[index] = newData;
          setUser([...updateUser]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
     
  }


  //function for deleting a row
  const handleRowDelete = (oldData, resolve) => {
    console.log(oldData.id)
    axios.get(`${BASE_URI}/${oldData.id}`)
      .then(response => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setIserror(true)
        resolve()
      })
  }


  //function for adding a new row to the table
  const handleRowAdd = (newData, resolve) => {
    //validating the data inputs
    let errorList = []

    if (errorList.length < 1) {
      axios.post(`${BASE_URI}/create/`, newData)
        .then(response => {
          let newUserdata = [...user];
          newUserdata.push(newData);
          setUser(newUserdata);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }


  return (
    <div className="app">


      <MaterialTable
        title="Assets Table"
        columns={columns}
        data={user}
        options={{
          headerStyle: { borderBottomColor: 'grey' },
          exportButton:true,
          actionsColumnIndex: -1
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);

            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
      />

      <div>
        {iserror &&
          <Alert severity="error">
            <AlertTitle>ERROR</AlertTitle>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>
            })}
          </Alert>
        }
      </div>

    </div>
  );
}

export default AssetTable;
