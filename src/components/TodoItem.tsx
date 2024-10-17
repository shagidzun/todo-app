import {Stack, Typography} from "@mui/material";
import CheckedCircle from '@mui/icons-material/CheckCircleOutline';
import UncheckedCircle from '@mui/icons-material/RadioButtonUnchecked';

interface TodoItemProps {
    description: string;
    active: boolean;
}

export const TodoItem = ({description, active}: TodoItemProps) => {
    return (
        <Stack direction="row">
            {active ? (
              <CheckedCircle/>
            ) : (
              <UncheckedCircle/>
            )}
            <Typography sx={{textDecoration: active ? 'none' : 'line-through'}}>{description}</Typography>
        </Stack>
    );
};