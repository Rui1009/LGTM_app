import React from "react";
import {TextField, InputAdornment, makeStyles} from "@material-ui/core"
import {InjectedFormProps, WrappedFieldProps, Field, reduxForm, getFormValues} from "redux-form"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export const renderField = (
    props: WrappedFieldProps & {  label?: string; type?: string; unit: string }
) => {
    return (
        <TextField
            label={props.label}
            error={props.meta.touched && props.meta.error}
            helperText={props.meta.touched && props.meta.error}
            type={props.type}
            InputProps={{
                endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>
            }}
            {...props.input}
        />
    );
};

const useStyles = makeStyles({
    content: {
        textAlign: "center",
    }
});

const SendForm = (props: InjectedFormProps) => {
    const classes = useStyles()
    return (
        <form onSubmit={props.handleSubmit}>
            <Grid container xs={12}>
                <Grid item xs={9}>
                <Field
                    label={"URL"}
                    name={"url"}
                    component={renderField}
                    type={"string"}
                />
                </Grid>
                <Grid item xs={3} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button
                    disabled={props.pristine}
                    color={"primary"}
                    type={"submit"}
                    variant={"contained"}
                >作成</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default reduxForm({
    form: "sendForm"
})(SendForm)