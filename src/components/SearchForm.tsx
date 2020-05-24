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
            style={{width: "25%", margin: "10px"}}
        />
    );
};

const SearchForm = (props: InjectedFormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Grid style={{display: "flex", alignItems: "center"}}>
                <Field
                    label={"検索"}
                    name={"word"}
                    component={renderField}
                    type={"string"}
                />
                <Button
                    disabled={props.pristine}
                    color={"primary"}
                    type={"submit"}
                    variant={"contained"}
                >検索</Button>
            </Grid>
        </form>
    )
}

export default reduxForm({
    form: "searchForm"
})(SearchForm)