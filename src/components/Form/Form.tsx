import React, {useState, useEffect, SyntheticEvent, ChangeEventHandler} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
// @ts-ignore
import FileBase from 'react-file-base64';

import useStyles from './styles';
import {createPost, updatePost} from '../../redux/actions/posts';
import {UserProfile} from '../Navbar/Navbar';
import {IdProps, Post, State} from '../../types';

const Form = ({currentId, setCurrentId}: IdProps) => {
  const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''});
  const post = useSelector((state: State) => (currentId ? state.posts.find((post: Post) => post._id === currentId.toString()) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const localProfile: string | null = localStorage.getItem('profile');
  const user: UserProfile | null = localProfile === null ? null : JSON.parse(localProfile);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId('0');
    setPostData({title: '', message: '', tags: '', selectedFile: ''});
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (Number(currentId) === 0) {
      dispatch(createPost({...postData, name: user?.result?.name}));
      clear();
    } else {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
      clear();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as typeof e.target & {
      title: {value : string};
      message: {value: string};
      tags: { value: string };
      selectedFile: { value: string };
    };
    if (target.name === '' || target.name === null || target.name === undefined) {
      return;
    } else if (e.target.name === 'tags') {
      setPostData({ ...postData, [target.name]: target.value.split(',')})
    } else {
      setPostData({...postData, [target.name]: target.value})
    }
  }

  if(!user?.result?.name) {
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create or like a post!
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} onChange={handleChange as any}>
        <Typography variant="h6">{currentId === "0" ? 'Creating a Note' : `Editing "${postData.title}"`}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}: any) => setPostData({...postData, selectedFile: base64})} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;