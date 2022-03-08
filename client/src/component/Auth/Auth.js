import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Grid, Typography, Container,Paper, Button} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
// import { useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Icon from './icon';
import useStyles from './styles'
import Input from './Input';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false)
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const handleSubmit =() => {

    }

    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; 
        const token = res?.tokenId;
        try {
          dispatch ({type : 'AUTH', data : {result,token }});
    
        //   history.push('/')
        } catch (error) {
          console.log(error)
        }
      };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccesful. Try again Later.")
    }

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {
                      isSignup && (
                          <>
                                <Input name="FirstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="FirstName" label="First Name" handleChange={handleChange} autoFocus half />
                          </>
                      )
                  }  
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                  { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin 
                    clientId='656548990768-jf0s3djjnuk0k4u6856uh7gp619a5cq6.apps.googleusercontent.com'
                    render= {(renderProps) => (
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                            Google Sign In
                        </Button>
                    )}
                    onSuccess= {googleSuccess}
                    onFailure= {googleFailure}
                    cookiePolicy = "single_host_origin"
                
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth