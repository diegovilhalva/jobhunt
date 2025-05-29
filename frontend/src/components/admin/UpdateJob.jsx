import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { setSingleJob } from '../../redux/jobSlice';
import { JOB_API_ENDPOINT } from '../../constants';

import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const UpdateJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);

  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || '',
        description: singleJob.description || '',
        requirements: singleJob.requirements || [],
        salary: singleJob.salary || '',
        location: singleJob.location || '',
        jobType: singleJob.jobType || '',
        experience: singleJob.experienceLevel || '',
        position: singleJob.numberOfOpenings || 0,
      });
    }
  }, [singleJob]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleJobTypeChange = (value) => {
    setInput({ ...input, jobType: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.patch(
        `${JOB_API_ENDPOINT}/update/${jobId}`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error has occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto my-10 px-4'>
        <Button
          onClick={() => navigate('/admin/jobs')}
          variant='outline'
          className='flex flex-wrap items-center gap-2 text-gray-500 font-semibold'
        >
          <ArrowLeft className='w-4 h-4' />
          <span className='text-sm md:text-base'>Back</span>
        </Button>

        <form
          onSubmit={submitHandler}
          className='mt-6 p-4 md:p-6 border rounded shadow'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label>Title</Label>
              <Input
                type='text'
                name='title'
                value={input.title}
                onChange={changeHandler}
                className='my-1'
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeHandler}
                className='my-1'
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type='text'
                name='requirements'
                value={input.requirements}
                onChange={changeHandler}
                className='my-1'
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type='text'
                name='salary'
                value={input.salary}
                onChange={changeHandler}
                className='my-1'
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeHandler}
                className='my-1'
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Select value={input.jobType} onValueChange={handleJobTypeChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select job type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='full-time'>Full-Time</SelectItem>
                    <SelectItem value='part-time'>Part-Time</SelectItem>
                    <SelectItem value='remote'>Remote</SelectItem>
                    <SelectItem value='contract'>Contract</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type='text'
                name='experience'
                value={input.experience}
                onChange={changeHandler}
                className='my-1'
              />
            </div>
            <div>
              <Label>Number of Positions</Label>
              <Input
                type='number'
                name='position'
                value={input.position}
                onChange={changeHandler}
                className='my-1'
              />
            </div>
          </div>

          <div className='mt-6'>
            {loading ? (
              <Button disabled className='w-full bg-[#6A38C2]'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Updating...
              </Button>
            ) : (
              <Button type='submit' className='w-full bg-[#6A38C2] hover:bg-[#5b30a6]'>
                Update Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
