import React, { useEffect, useState } from "react";
import axiost from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import url from "../../config/url";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UsersSetting() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiost.get(`${url.LOCAL}/user/userslist`).then((res) => setUsers(res.data));
  }, []);

  const classes = useStyles();
  return (
    <div>
      <h2>Danh sách tài khoản</h2>
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-3" key={index}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} title={user.username} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tên tài khoản: {user.username}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    SĐT: {user.phone}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    Email: {user.email}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
