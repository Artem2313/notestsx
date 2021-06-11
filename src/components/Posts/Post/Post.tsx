import React from 'react';
import {useDispatch} from 'react-redux';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {likePost, deletePost} from '../../../redux/actions/posts';
import {Post as PostProps} from '../../../types';

import useStyles from './styles';
import {UserProfile} from '../../Navbar/Navbar';

type Props = {
  setCurrentId: (el: string) => void,
  post: PostProps
}

const Post = ({post, setCurrentId}: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const localProfile: string | null = localStorage.getItem('profile');
  const user: UserProfile | null = localProfile === null ? null : JSON.parse(localProfile);

  const Likes = () => {
    const postsLength = post?.likes?.length !== undefined ? post.likes.length : 0;
    if (postsLength > 0) {
      return post?.likes?.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{postsLength > 2 ? `You and ${postsLength - 1} others` : `${postsLength} like${postsLength > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{postsLength} {postsLength === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const isCreatedByUser = user?.result?.googleId === post?.creator || user?.result?._id === post?.creator;

  const handleEdit = () => {
    if(post._id && post._id !== undefined) {
      setCurrentId(post._id)
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {isCreatedByUser && (
        <div className={classes.overlay2}>
          <Button style={{color: 'white'}} size="small" onClick={handleEdit}><MoreHorizIcon fontSize="default" /></Button>
        </div>
        )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag: string) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id!))}>
          <Likes />
        </Button>
        {isCreatedByUser && (
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id!))}>
          <DeleteIcon fontSize="small" />Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;