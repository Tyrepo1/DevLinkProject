import { DevTool } from '@hookform/devtools';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch
} from '@mui/material';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import InputField from '../../../components/InputField';
import SkillsInput from './SkillsInput';
import {resizePngImage, uploadPdfToFirestore} from '../../../api/CreateProfile/CreateProfileAPI'


const ProfileForm = ({ onSubmitForm, profile }) => {
  const username = localStorage.getItem("username")
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      age: profile?.age || '',
      location: profile?.location || '',
      experienceLevel: profile?.experienceLevel || '',
      educationLevel: profile?.educationLevel || '',
      jobType: profile?.jobType || '',
      workEnvironment: profile?.workEnvironment || '',
      willingnessToRelocate: profile?.willingnessToRelocate || '',
      skills: profile?.skills || '',
      languages: profile?.languages || '',
      isPublic: profile?.isPublic || false,
      resume: profile?.resume || '',
      profilePicture: profile?.profilePicture || '',
      bannerPicture: profile?.bannerPicture || 'https://wiki.tripwireinteractive.com/TWIimages/4/47/Placeholder.png',
    },
  });
  

  const skills = useFieldArray({ control, name: 'skills' });
  const languages = useFieldArray({ control, name: 'languages' });

  const inputFields = [
    { keyName: 'firstName', type: 'text', label: 'First Name', validation: { required: 'This field is required' }, gridSize: 4 },
    { keyName: 'lastName', type: 'text', label: 'Last Name', validation: { required: 'This field is required' }, gridSize: 4 },
    { keyName: 'age', type: 'text', label: 'Age', validation: { required: 'This field is required' }, gridSize: 4 },
    { keyName: 'location', type: 'text', label: 'Location', validation: { required: 'This field is required' }, gridSize: 12 },
    { keyName: 'skills', type: 'skills', label: 'Skills', fieldArray: skills, gridSize: 12 },
    { keyName: 'languages', type: 'skills', label: 'Languages', fieldArray: languages, gridSize: 12 },
    { keyName: 'experienceLevel', type: 'select', label: 'Experience Level', options: ['Junior', 'Mid-level', 'Senior'], gridSize: 6 },
    { keyName: 'educationLevel', type: 'select', label: 'Education Level', options: ["Bachelor's Degree", "Master's Degree", "Ph. D."], gridSize: 6 },
    { keyName: 'jobType', type: 'select', label: 'Preferred Job Type', options: ['Full-time', 'Part-time', 'Freelance'], gridSize: 6 },
    { keyName: 'workEnvironment', type: 'select', label: 'Work Environment', options: ['On-Site', 'Remote'], gridSize: 6 },
    { keyName: 'willingnessToRelocate', type: 'select', label: 'Willingness to Relocate', options: ['Willing', 'Not Willing'] },
  ];

  const handleUploadFile = (stateKey) => async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async () => {
      const base64String = reader.result;
  
      if (file.type === 'image/png') {
        resizePngImage(base64String)
          .then((resizedBase64String) => {
            setValue(stateKey, resizedBase64String);
          })
          .catch((error) => {
            console.error('Error resizing PNG image:', error);
          });
      } else {
        setValue(stateKey, base64String);
      }
    };
  
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') event.preventDefault();
  };

  const handleUploadPdf = (stateKey) => async (event) => {
    const file = event.target.files[0];
    uploadPdfToFirestore(file).then(
      (result) => {
        console.log("Received: " + result)
        setValue("resume", result)
      }
    )
  }
  

  register("profilePicture")
  register("bannerPicture")
  register("resume")
  const profilePictureValue = watch('profilePicture');
  const bannerPictureValue = watch('bannerPicture');
  const resumeValue = watch('resume');

  return (
    <Container className="mt-8">
      <Paper elevation={3} className="p-6">
        <form onSubmit={handleSubmit(onSubmitForm)} onKeyDown={handleKeyDown}>
          <input type="file" accept=".png" style={{ display: 'none' }} id="upload-banner-picture" onChange={handleUploadFile('bannerPicture')} />
          <div className="relative">
            <img className="w-full h-64" src={bannerPictureValue} alt="Banner" />
            <EditIcon
              className="cursor-pointer text-white bg-blue-500 rounded-full p-1 absolute top-0 left-[calc(100%-2rem)]"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('upload-banner-picture').click();
              }}
              sx={{ width: '2rem', height: '2rem' }}
            />
          </div>
          <input type="file" accept=".png" id="upload-profile-picture" style={{ display: 'none' }} onChange={handleUploadFile('profilePicture')} />
          <div className="absolute top-[21rem]">
            <Avatar alt={profilePictureValue} src={profilePictureValue} sx={{ width: '7rem', height: '7rem' }} />
            <EditIcon
              className="cursor-pointer text-white bg-blue-500 rounded-full p-1 absolute top-20 left-20"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('upload-profile-picture').click();
              }}
              sx={{ width: '2rem', height: '2rem' }}
            />
          </div>
          <div className="text-right">
            <FormControlLabel control={<Switch {...register('isPublic')} defaultChecked={profile?.isPublic ? profile.isPublic : undefined} />} label="Public Profile" />
          </div>
          <Grid container spacing={3} sx={{ marginTop: '1rem' }}>
            {inputFields.map((field) => (
              <Grid item key={field.keyName} xs={12} md={field.gridSize} lg={field.gridSize}>
                {field.type === 'select' ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel id={`${field.keyName}Label`}>{field.label}</InputLabel>
                    <Select {...register(field.keyName)} defaultValue={profile?.[field.keyName]}>
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : field.type === 'skills' ? (
                  <SkillsInput fieldName={field.keyName} fieldArray={field.fieldArray} control={control} label={field.label} />
                ) : (
                  <InputField
                    key={field.keyName}
                    keyName={field.keyName}
                    type={field.type}
                    required={true}
                    label={field.label}
                    register={{ ...register(field.keyName, field.validation) }}
                    errors={errors}
                  />
                )}
              </Grid>
            ))}
            <div className="m-6">
              <input type="file" accept=".pdf" id="upload-resume" onChange={handleUploadPdf("resume")} style={{ display: 'none' }} />
              <Button
                variant="contained"
                endIcon={<FileUploadIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('upload-resume').click();
                }}
              >
                Upload Resume
              </Button>
              {resumeValue && (
                <a href={resumeValue} download={"resume.pdf"} target="_blank" rel="noopener noreferrer" className="ml-5 text-blue-500">
                  Download resume
                </a>
              )}
            </div>
          </Grid>
          <Button type="submit" variant="contained" color="primary" className="mt-4">
            {profile? "Update Profile" : "Save Profile"}
          </Button>
        </form>
      </Paper>
      <DevTool control={control} />
    </Container>
  );
};

export default ProfileForm;
