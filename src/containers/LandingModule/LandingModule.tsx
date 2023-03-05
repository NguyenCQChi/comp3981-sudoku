/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from "react";
import { MainButton } from "@src/components";
import { Modal, Box, List, ListItemText, ListItemButton, ListSubheader, Button } from '@mui/material';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';
import { useTheme } from '@mui/material/styles';

function LandingModule() {
  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState(false);
  const [openComGenerator, setOpenCom] = useState(false);
  const [openSelectFile, setSelectFile] = useState(false);
  const [size, setSize] = useState("9x9");
  const [path, setPath] = useState("");
  const [isTxtFile, setIsTxtFile] = useState(true);
  const { changeInitialBoard } = useContext(ResultContext);

  const buttonStyle = {
    '&.MuiButton-root': {
      fontSize: '0.8rem',
    },
    width: 'wrapContent',
    padding: '8px 20px'
  }

  const listItemButtonStyle = {
    '&.Mui-selected': { 
      backgroundColor: theme.palette.secondary.light,
      ':hover': {
        backgroundColor: theme.palette.secondary.light
      }
    }, 
    color: theme.palette.primary.dark, 
    borderRadius: '3px',
    ':hover' : {
      backgroundColor: theme.palette.secondary.light
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
    let file = event.target.files[0];
    if (file?.type == "text/plain") {
      setIsTxtFile(true)
      let reader = new FileReader();
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
      let newData = fileData.split("\r\n")
      let gridNums: any[] = []

      let rows = newData.length;
      let columns = newData[0].length;

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
    for (let i = 0; i < rows; i++) {
        arr.push([0])
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
  }

  useEffect(() => {
    setPath(`/oneSolution/${size}`)
  }, [size])

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: `linear-gradient(135deg, white, ${theme.palette.secondary.light} 50%, white)`}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', width: '80%', height: '90%'}}>
        <div style={{textAlign: 'center', padding: '3rem'}}>
          <p style={{fontSize: '4rem', fontWeight: 700, color: '#143c5c'}}>Welcome!</p>
        </div>

        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          flexWrap: 'wrap', 
          alignItems: 'center',
          width: '20%',
          gap: '8px'
        }}>
          <MainButton title="Create" handleOnClick={handleCreate} option={false} />
          <MainButton title='Solve Brute Force' option={false} disable={true}/>
          <MainButton title ='Solve CSP' option={false} disable={true}/>
          <MainButton title='Clear' option={false} disable={true}/>
          <Link href='/exit'>
            <a style={{textDecoration: 'none', width: "100%"}}>
              <MainButton title='Exit' option={false}/>
            </a>
          </Link>

          <Modal
            open={openCreate}
            onClose={handleCreate}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'wrapContent'}}
          >
            <Box 
              sx={{
                width: 500, 
                height: 500,
                bgcolor: 'background.paper', 
                border:  `3px solid ${theme.palette.primary.dark}`,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{width: '80%', height: '80%'}}>
                {!openComGenerator && !openSelectFile ? 
                (
                  <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                    <p style={{fontSize: '1.5rem', color: theme.palette.primary.dark}}>Select an Option:</p>
                    <div style={{display: 'flex', flexDirection: 'column', width: '65%', gap: '12px', height: '100%', justifyContent: 'center'}}>
                      <MainButton title='Select a Text File' option={true} handleOnClick={handleSelectFile} />
                      <MainButton title='Computer Generate' option={true} handleOnClick={handleComputerGenerate}/>
                    </div>
                  </div>
                ) : (
                  openComGenerator ? (
                    <div style={{gap: '10px', display: 'flex', flexDirection: 'column'}}>
                      <List
                        subheader={<ListSubheader sx={{'&.MuiListSubheader-root': {fontSize: '1.5rem'}, textAlign: 'center', color: theme.palette.primary.dark}} component="div" >Select a Size: </ListSubheader>}
                      />
                        <ListItemButton sx={listItemButtonStyle} key={"9x9"} onClick={() => setSize("9x9")} selected={size == "9x9"}><ListItemText sx={{textAlign: 'center'}} primary="9 x 9"></ListItemText></ListItemButton>
                        <ListItemButton sx={listItemButtonStyle} key={"12x12"} onClick={() => setSize("12x12")} selected={size == "12x12"}><ListItemText sx={{textAlign: 'center'}} primary="12 x 12" /></ListItemButton>
                        <ListItemButton sx={listItemButtonStyle} key={"16x16"} onClick={() => setSize("16x16")} selected={size == "16x16"}><ListItemText sx={{textAlign: 'center'}} primary="16 x 16"></ListItemText></ListItemButton>
                        <ListItemButton sx={listItemButtonStyle} key={"25x25"} onClick={() => setSize("25x25")} selected={size == "25x25"}><ListItemText sx={{textAlign: 'center'}} primary="25 x 25"></ListItemText></ListItemButton>
                        <ListItemButton sx={listItemButtonStyle} key={"100x100"} onClick={() => setSize("100x100")} selected={size == "100x100"}><ListItemText sx={{textAlign: 'center'}} primary="100 x 100"></ListItemText></ListItemButton>
                      <Link
                        href={path}
                      >
                        <a style={{textDecoration: 'none'}}>
                          <MainButton title='Submit'/>
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', height: '100%'}}>
                      <p style={{fontSize: '1.5rem', color: theme.palette.primary.dark}}>Enter Path:</p>
                      <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '75%', gap: '8px'}}> 
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
                              <MainButton disable={!isTxtFile} title='Submit' sx={buttonStyle}/>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )
              }
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default LandingModule;