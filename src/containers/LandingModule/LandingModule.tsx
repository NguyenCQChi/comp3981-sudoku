/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from "react";
import { MainButton } from "@src/components";
import { Modal, Box, List, ListItemText, ListItemButton, ListSubheader, Button } from '@mui/material';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';

function LandingModule() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openComGenerator, setOpenCom] = useState(false);
  const [openSelectFile, setSelectFile] = useState(false);
  const [size, setSize] = useState("9x9");
  const [path, setPath] = useState("");
  const [isTxtFile, setIsTxtFile] = useState(true);
  const { changeInitialBoard, initialBoard } = useContext(ResultContext);

  const buttonStyle = {
    '&.MuiButton-root': {
      backgroundColor: "blue",
      color: 'white',
      fontSize: '0.75rem',
    }
  }

  const handleCreate = () => {
    setOpenCreate(!openCreate);
    setOpenCom(false)
    setSelectFile(false)
  }

  const handleComputerGenerate = () => {
    setOpenCom(!openComGenerator)
    changeInitialBoard([])
  }

  const handleSelectFile = () => {
    setSelectFile(!openSelectFile)
  }

  function onChange(event: any) {
    event.preventDefault()
    var file = event.target.files[0];
    if (file?.type == "text/plain") {
      setIsTxtFile(true)
      var reader = new FileReader();
      reader.onload = async function(event) {
        const fileData = event.target?.result;
        readFile(fileData);
      }
      reader.readAsText(file);
    } else {
      setIsTxtFile(false)
    }
  }

  async function readFile(fileData: any) {
    if (fileData !== undefined) {
      var newData = fileData.split("\r\n")
      var gridNums: any[] = [];
      
      var rows = newData.length;
      var columns = newData[0].length;

      fill2DimensionsArray(gridNums, rows, columns);

      for (let i = 0; i < newData.length; i++) {
        for (let j = 0; j < newData[i].length; j++) {
          gridNums[i][j] = newData[i].charAt(j)
        }
      }
      changeInitialBoard(gridNums)
    }
  }

  function fill2DimensionsArray(arr: any, rows: any, columns: any){
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
  }

  useEffect(() => {
    setPath(`/oneSolution/${size}`)
  }, [size])

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center'}}>
      <div style={{textAlign: 'center', padding: '3rem'}}>
        <strong style={{fontSize: '4rem'}}>Welcome!</strong>
      </div>

      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        flexWrap: 'wrap', 
        alignItems: 'center',
        width: '18%'
      }}>
      <MainButton title="Create" handleOnClick={handleCreate} option={false} />
      <MainButton title='Solve Brute Force' option={false} disable={true}/>
      <MainButton title ='Solve CSP' option={false} disable={true}/>
      <MainButton title='Clear' option={false} disable={true}/>
      <MainButton title='Exit' option={false}/>

      <Modal
        open={openCreate}
        onClose={handleCreate}
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Box 
          sx={{
            width: 400, 
            height: 400,
            bgcolor: 'background.paper', 
            border: '5px solid black',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{width: '80%'}}>
            {!openComGenerator && !openSelectFile ? 
            (
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <p style={{fontSize: '1.5rem'}}>Select an Option:</p>
                <div style={{display: 'flex', flexDirection: 'column', width: '80%', gap: '10px'}}>
                  <MainButton title='Select a Text File' option={true} handleOnClick={handleSelectFile} />
                  <MainButton title='Computer Generate' option={true} handleOnClick={handleComputerGenerate}/>
                </div>
              </div>
            ) : (
              openComGenerator ? (
                <div>
                <List
                  subheader={<ListSubheader sx={{'&.MuiListSubheader-root': {fontSize: '1.5rem'}, textAlign: 'center'}} component="div" >Select a Size: </ListSubheader>}
                />
                  <ListItemButton key={"9x9"} onClick={() => setSize("9x9")}><ListItemText sx={{textAlign: 'center'}} primary="9 x 9"></ListItemText></ListItemButton>
                  <ListItemButton key={"12x12"} onClick={() => setSize("12x12")}><ListItemText sx={{textAlign: 'center'}} primary="12 x 12"></ListItemText></ListItemButton>
                  <ListItemButton key={"16x16"} onClick={() => setSize("16x16")}><ListItemText sx={{textAlign: 'center'}} primary="16 x 16"></ListItemText></ListItemButton>
                  <ListItemButton key={"25x25"} onClick={() => setSize("25x25")}><ListItemText sx={{textAlign: 'center'}} primary="25 x 25"></ListItemText></ListItemButton>
                  <ListItemButton key={"100x100"} onClick={() => setSize("100x100")}><ListItemText sx={{textAlign: 'center'}} primary="100 x 100"></ListItemText></ListItemButton>
                <Link
                  href={path}
                >
                  <a style={{textDecoration: 'none'}}>
                    <MainButton title='Submit'/>
                  </a>
                </Link>
              </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', alignContent: 'center'}}>
                  <p style={{fontSize: '1.5rem'}}>Enter Path:</p>
                  <Box
                    sx={{
                      bgcolor: 'grey',
                      marginBottom: '10px' 
                    }}
                  >
                    <div style={{display: 'flex', alignItems: 'center', width: '100%', margin: '10px'}}>
                      <input type = "file" id = "input" onChange={onChange}/>
                    </div>
                  </Box>
                  {!isTxtFile && <p style={{color: 'red'}} >Error!</p>}
                  <div style={{width: '100%'}}>
                    <Link
                      href={isTxtFile ? path : '/'}
                    >
                      <a style={{textDecoration: 'none'}}>
                        <Button variant="outlined" color="inherit" sx={buttonStyle} disabled={!isTxtFile}>Submit</Button>
                      </a>
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </Box>
      </Modal>
    </div>

    </div>
  )
}

export default LandingModule;