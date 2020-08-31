import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import { get } from 'lodash';
import ImageUploader from 'src/components/ImageUploader/Avatar';
import { useSelector } from 'react-redux';
import { userRoles } from 'src/utils/data';
import { uploadProfileImage } from 'src/actions/profileActions';

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 120,
    width: 200
  }
}));

function ProfileDetails({ user, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.profile.userProfile);

  const [profileImage, setProfileImage] = useState('');
  const [isImageAdded, setImageAdded] = useState(false);

  const uploaderRef = useRef(null);

  let userInfo = {};
  if (user && Object.keys(user).length > 0) {
    userInfo = get(user, 'data', {});
  }

  const onImageChange = e => {
    const image = e.target.files[0];

    const data = {
      image: image
    };
    let reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
      setImageAdded(true);
    };
    reader.readAsDataURL(e.target.files[0]);
    dispatch(uploadProfileImage(data));
  };
  const removePictureHandler = () => {
    setProfileImage('');
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <ImageUploader size={120}>
            {
              isImageAdded ?
              <ImageUploader.Preview src={profileImage} />
              :
              userProfile.profileImage ?
              <ImageUploader.Preview src={userProfile.profileImage} />
              :
              <Avatar
              className={classes.avatar}
              src="/broken-image.jpg"
              onClick={() => {
                uploaderRef.click();
              }}
            />
            }
            <ImageUploader.Uploader
              fileType={('image/jpg', 'image.png', 'image.jpeg')}
              ref={uploaderRef}
              onChange={onImageChange}
            />
          </ImageUploader>
          {/* <Avatar
            className={classes.avatar}
            src={user.avatar}
          /> */}
          <Typography
            className={classes.name}
            gutterBottom
            variant="h3"
            color="textPrimary"
          >
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            {userRoles.map(role => {
              if (role.value === userInfo.role) {
                return role.label;
              }
            })}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="text" onClick={removePictureHandler}>
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
