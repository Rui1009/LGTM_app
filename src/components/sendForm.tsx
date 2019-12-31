import React from "react";
import {TextField, InputAdornment, makeStyles} from "@material-ui/core"
import {InjectedFormProps, WrappedFieldProps, Field, reduxForm, getFormValues} from "redux-form"
import Button from "@material-ui/core/Button";

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
    },
    form: {
        marginBottom: 12
    }
});

const SendForm = (props: InjectedFormProps) => {
    const classes = useStyles()
    return (

        <form onSubmit={props.handleSubmit} className={classes.form}>
            <Field
                name={"url"}
                component={renderField}
                type={"string"}
            />
            <Button
                disabled={props.pristine}
                color={"primary"}
                type={"submit"}
                variant={"contained"}
            >投稿</Button>
        </form>
    )
}

export default reduxForm({
    form: "sendForm"
})(SendForm)