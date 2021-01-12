import React, {useContext} from "react"
import { Typography, Button, Grid } from "@material-ui/core"
import { gql, useMutation } from '@apollo/client';
 
const MUTATION = gql`
  mutation CreateMediaObject($file: Upload!) {
    uploadMediaObject(input: {file: $file}) {
        mediaObject {
            id
            contentUrl
        }
    }
  }
`;

export default function Test() {


    const [mutate] = useMutation(MUTATION);
 


    
    function onChange({
      target: {
        validity,
        files: [file],
      },
    }) {
      console.log(file)
      mutate({ variables: { file }})
    }


    return(

        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
          <input type="file" required onChange={onChange} />;
        </Grid>

    )
}