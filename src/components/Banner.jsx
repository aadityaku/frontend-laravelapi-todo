import { Button,  FormControlLabel,  FormGroup,  Grid,  LinearProgress,  Paper, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect } from "react";
import axios from "axios";
const Banner = () =>{
    const [todo,setTodo] = useState({
        task:""
    });
    const [check,setCheck] = useState(false);
    const [task,setTask] = useState(false);
    const [data,setData] = useState([]);
    const handleChange = () =>{
        if(check === false){
            setCheck(true);
            setTask(true);
        }
        else{
            setCheck(false);
            setTask(false);
        }
        
    }
     useEffect(()=>{
        async function getAllTodo(){
            try{
                const data = await axios.get('http://localhost:8000/api/todo')
                console.log(data.data)
                setData(data.data);
            }catch(error){
                console.log("error");
            }
        }
        getAllTodo()
     },[])
     async function handleSubmit(e){
         e.preventDefault()
            try{
                await axios.get('http://localhost:8000/api/todo',todo)
                
                
            }catch(error){
                console.log("error");
            }
        }
     
    function changeValue(e){
         setTodo({
            ...todo,
            [e.target.name] : e.target.value
         })
     }

    return(
        <Container maxWidth="md" sx={{marginTop:3}}>
            <Paper elevation={3} >
                <Grid container>
                    <Grid item xs={12} sx={{display:"flex",paddingX:4,paddingY:2}}>
                        {/* <form noValidate style={{display:"flex"}}> */}
                        <TextField fullWidth variant="standard" label="Input Here Task" sx={{margin:1.5}} name="task" onChange={(e) => changeValue(e)} ></TextField>
                        <Button variant="outlined" color="secondary"  sx={{margin:1.5}} onClick={(e) => handleSubmit(e)} >Go</Button>
                        {/* </form> */}
                    </Grid>
                    
                </Grid>
                <Grid container>
                    <Grid item xs={6}></Grid>
                <Grid  item xs={6} sx={{display:"flex",paddingX:4}}>
                        <Button variant="contained" color="success" sx={{margin:1}}>Completed</Button>
                        <Button variant="contained" color="error"  sx={{margin:1}}>Uncompleted</Button>
                        <Button variant="contained" color="primary" sx={{margin:1}}>Prev</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    
                <Grid  item xs={12} sx={{display:"flex",paddingX:4}}>
                     <Table>
                        <TableHead>
                            <TableRow>
                            
                                <TableCell>Id</TableCell>
                                <TableCell>Task</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Status</TableCell>
                                {
                                    !check && <TableCell>Delete</TableCell>
                                }
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((value,index)=>{
                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{value.id}</TableCell>
                                                <TableCell>{
                                    task && <del style={{color:"red"}}>{value.task}</del>
                                    }
                                    {
                                        !task && value.task
                                    }
                                    </TableCell>
                                <TableCell>
                            <FormGroup>
                             <FormControlLabel
                               control={
                                 <Switch onChange={() => handleChange()} />
                               }
                               
                             />
                           </FormGroup>
                                </TableCell>
                                <TableCell>
                                    {
                                        check && <CheckOutlinedIcon variant="contained" color="success"/>
                                        
                                    }
                                    {
                                        !check && <LinearProgress />
                                    }
                                    
                                </TableCell>
                                {
                                    !check && <TableCell><Button><DeleteOutlinedIcon color="error"/></Button></TableCell>
                                }
                               <TableCell><Button><EditOutlinedIcon color="warning"/></Button></TableCell>
                            </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                     </Table>
                    </Grid>
                </Grid>
            </Paper>           
    </Container>
    )
}

export default Banner;