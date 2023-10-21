import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
    {
        label: 'Received',
        timestamp: `Sept 15 2023 12:23 pm`,
        description: ``,
    },
    {
        label: 'On hold',
        timestamp: `Sept 15 2023 12:23 pm`,
        description: ``,
    },
    {
        label: 'Returned',
        timestamp: `Sept 15 2023 12:23 pm`,
        description:
            'Palta bering',
    },
    {
        label: 'Received',
        timestamp: `Sept 15 2023 12:23 pm`,
        description: ``,
    },
    {
        label: 'Sent',
        timestamp: `Sept 15 2023 12:23 pm`,
        description: ``,
    },
];

function VerticalStepper({ stepperData }) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper orientation="vertical">
                {stepperData.map((step, index) => (
                    <Step active={true} key={step.label}>
                        <StepLabel
                            optional={
                                (
                                    <Box display={"flex"} justifyContent={"space-between"}>
                                        <Typography variant="caption">{step.timestamp}</Typography>

                                    </Box>
                                )
                            }
                        >
                            {step.label} {index === 2 && <Typography variant="caption">Delay: 30minutes</Typography>}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {
                // activeStep === steps.length && (
                //     <Paper square elevation={0} sx={{ p: 3 }}>
                //         <Typography>All steps completed - you&apos;re finished</Typography>
                //         <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                //             Reset
                //         </Button>
                //     </Paper>
                // )
            }
        </Box >
    );
}

export default VerticalStepper;