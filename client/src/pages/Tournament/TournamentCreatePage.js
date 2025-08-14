import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaTrophy, FaUpload, FaUserTie, FaInfoCircle, FaClipboardList, FaMedal } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
// Import mock auth state for testing
import mockAuthState from '../../mock/authState';
import { useDispatch } from 'react-redux';
import { createTournament } from '../../redux/slices/tournamentSlice';

// Validation schema
const schema = yup.object().shape({
  // Organizer Info
  organizerName: yup.string().required('Organizer name is required'),
  organizerEmail: yup.string().email('Invalid email format').required('Email is required'),
  organizerPhone: yup.string().required('Contact number is required'),
  whatsappLink: yup.string(),

  // Tournament Info
  tournamentName: yup.string().required('Tournament name is required'),
  sport: yup.string().required('Sport is required'),
  format: yup.string().required('Tournament format is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().min(
    yup.ref('startDate'),
    "End date can't be before start date"
  ).required('End date is required'),
  venueName: yup.string().required('Venue name is required'),
  venueAddress: yup.string().required('Venue address is required'),
  venueMapLink: yup.string().url('Must be a valid URL'),

  // Rules & Info
  specialRules: yup.string(),
  reportingTime: yup.string().required('Reporting time is required'),
  amenities: yup.string(),
  equipment: yup.string().required('Equipment requirements are required'),

  // Awards
  prizes: yup.string().required('Prize details are required'),
  specialAwards: yup.string(),

  // Registration Details
  registrationStartDate: yup.date().required('Registration start date is required'),
  registrationEndDate: yup.date().min(
    yup.ref('registrationStartDate'),
    "Registration end date can't be before start date"
  ).required('Registration end date is required'),
  entryFee: yup.number().min(0, 'Entry fee must be a positive number').required('Entry fee is required'),
  paymentDetails: yup.string().required('Payment details are required'),
  eligibility: yup.string().required('Eligibility criteria are required'),
  minTeamSize: yup.number().min(1, 'Minimum team size must be at least 1').required('Minimum team size is required'),
  requiredDocuments: yup.string()
});

const TournamentCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('TournamentCreatePage rendering...');
  console.log('Mock Auth State:', mockAuthState);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sport: '',
      format: '',
      entryFee: 0,
      minTeamSize: 5
    }
  });

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // In a real app, you would upload the logo file and submit the form data to your API
      console.log('Form Data:', data);
      console.log('Logo File:', logoFile);
      
      // Prepare tournament data with status and ID
      const tournamentData = {
        _id: Date.now().toString(), // Mock ID
        ...data,
        name: data.tournamentName, // Ensure we have a 'name' field for consistency
        status: 'active', // Set status to active
        registrationOpen: true,
        logoUrl: logoPreview || null,
        teamCount: 0,
        location: data.venueName, // For consistency in display
        sport: data.sport,
        createdAt: new Date().toISOString()
      };
      
      // Dispatch to Redux - in a real app this would send to the server
      // For the mock implementation, we'll use a timeout to simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dispatch the create action
      dispatch(createTournament(tournamentData));
      
      showToast('Tournament published successfully! Players can now register.', 'success');
      reset();
      setLogoFile(null);
      setLogoPreview(null);
      
      // Redirect to tournaments page
      navigate('/tournaments');
    } catch (error) {
      console.error('Error creating tournament:', error);
      showToast('Failed to create tournament. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sportOptions = ['Basketball', 'Soccer', 'Volleyball', 'Tennis', 'Cricket', 'Hockey', 'Rugby', 'Badminton'];
  
  const formatOptions = {
    'Basketball': ['5v5', '3v3', 'League', 'Knockout', 'Mixed'],
    'Soccer': ['11v11', '7v7', '5v5', 'League', 'Knockout'],
    'Volleyball': ['6v6', '4v4', 'Beach', 'Indoor', 'League', 'Knockout', 'Mixed'],
    'Tennis': ['Singles', 'Doubles', 'Mixed Doubles', 'Round Robin', 'League', 'Knockout'],
    'Cricket': ['T20', 'ODI', 'Test', 'League', 'Knockout'],
    'Hockey': ['Field Hockey', 'Ice Hockey', 'League', 'Knockout'],
    'Rugby': ['Union', 'League', 'Sevens', 'Knockout'],
    'Badminton': ['Singles', 'Doubles', 'Mixed Doubles', 'Team Event', 'League', 'Knockout']
  };

  // Form section component for reusability
  const FormSection = ({ title, icon, children }) => (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
        {icon}
        <h2 className="text-xl font-semibold text-gray-800 ml-2">{title}</h2>
      </div>
      {children}
    </div>
  );

  // Input field component for reusability
  const InputField = ({ label, name, type = "text", register, error, placeholder = "", options = [], className = "" }) => (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {type === "select" ? (
        <select
          id={name}
          {...register(name)}
          className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          rows="4"
          placeholder={placeholder}
          className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        ></textarea>
      ) : (
        <input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Organize a Tournament</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to create a new tournament. All fields marked with an asterisk (*) are required.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Organizer Information */}
          <FormSection title="Organizer Information" icon={<FaUserTie className="text-blue-500" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Organizer Name *"
                name="organizerName"
                register={register}
                error={errors.organizerName}
                placeholder="Your name or organization name"
              />
              <InputField
                label="Email Address *"
                name="organizerEmail"
                type="email"
                register={register}
                error={errors.organizerEmail}
                placeholder="contact@example.com"
              />
              <InputField
                label="Phone Number *"
                name="organizerPhone"
                register={register}
                error={errors.organizerPhone}
                placeholder="+1 123-456-7890"
              />
              <InputField
                label="WhatsApp Group Link (Optional)"
                name="whatsappLink"
                register={register}
                error={errors.whatsappLink}
                placeholder="https://chat.whatsapp.com/..."
              />
            </div>
          </FormSection>

          {/* Tournament Information */}
          <FormSection title="Tournament Information" icon={<FaTrophy className="text-blue-500" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputField
                  label="Tournament Name *"
                  name="tournamentName"
                  register={register}
                  error={errors.tournamentName}
                  placeholder="e.g., Summer Basketball Championship 2025"
                />
              </div>
              
              <InputField
                label="Sport *"
                name="sport"
                type="select"
                register={register}
                error={errors.sport}
                options={sportOptions}
              />
              
              <InputField
                label="Tournament Format *"
                name="format"
                type="select"
                register={register}
                error={errors.format}
                options={formatOptions[register('sport').value] || ['League', 'Knockout']}
              />
              
              <InputField
                label="Start Date *"
                name="startDate"
                type="date"
                register={register}
                error={errors.startDate}
              />
              
              <InputField
                label="End Date *"
                name="endDate"
                type="date"
                register={register}
                error={errors.endDate}
              />
              
              <InputField
                label="Venue Name *"
                name="venueName"
                register={register}
                error={errors.venueName}
                placeholder="e.g., Central City Sports Complex"
              />
              
              <InputField
                label="Venue Address *"
                name="venueAddress"
                register={register}
                error={errors.venueAddress}
                placeholder="Full address"
              />
              
              <InputField
                label="Map Link (Optional)"
                name="venueMapLink"
                register={register}
                error={errors.venueMapLink}
                placeholder="Google Maps URL"
              />
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tournament Logo (Optional)
                </label>
                <div className="mt-1 flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 border rounded-md overflow-hidden bg-gray-100">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <FaTrophy className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="logo-upload"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
                  >
                    <FaUpload className="inline-block mr-2" />
                    Upload
                  </label>
                  <input
                    id="logo-upload"
                    name="logo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleLogoChange}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </FormSection>

          {/* Rules & Information */}
          <FormSection title="Rules & Information" icon={<FaInfoCircle className="text-blue-500" />}>
            <InputField
              label="Special Rules (Optional)"
              name="specialRules"
              type="textarea"
              register={register}
              error={errors.specialRules}
              placeholder="Any special rules or modifications to standard rules"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Reporting Time *"
                name="reportingTime"
                register={register}
                error={errors.reportingTime}
                placeholder="e.g., 1 hour before match"
              />
              
              <InputField
                label="Amenities Provided (Optional)"
                name="amenities"
                register={register}
                error={errors.amenities}
                placeholder="e.g., Water, First aid, Food stalls"
              />
            </div>
            
            <InputField
              label="Equipment Requirements *"
              name="equipment"
              type="textarea"
              register={register}
              error={errors.equipment}
              placeholder="What participants need to bring"
            />
          </FormSection>

          {/* Awards & Prizes */}
          <FormSection title="Awards & Prizes" icon={<FaMedal className="text-blue-500" />}>
            <InputField
              label="Prizes & Awards *"
              name="prizes"
              type="textarea"
              register={register}
              error={errors.prizes}
              placeholder="Details of main prizes, trophies, cash awards, etc."
            />
            
            <InputField
              label="Special Awards (Optional)"
              name="specialAwards"
              type="textarea"
              register={register}
              error={errors.specialAwards}
              placeholder="e.g., MVP, Best Player, Fair Play Award"
            />
          </FormSection>

          {/* Registration Details */}
          <FormSection title="Registration Details" icon={<FaClipboardList className="text-blue-500" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Registration Start Date *"
                name="registrationStartDate"
                type="date"
                register={register}
                error={errors.registrationStartDate}
              />
              
              <InputField
                label="Registration Deadline *"
                name="registrationEndDate"
                type="date"
                register={register}
                error={errors.registrationEndDate}
              />
              
              <InputField
                label="Entry Fee (in $) *"
                name="entryFee"
                type="number"
                register={register}
                error={errors.entryFee}
                placeholder="0"
              />
              
              <InputField
                label="Payment Details *"
                name="paymentDetails"
                register={register}
                error={errors.paymentDetails}
                placeholder="How and where to make payment"
              />
              
              <InputField
                label="Eligibility Criteria *"
                name="eligibility"
                register={register}
                error={errors.eligibility}
                placeholder="Age group, skill level, etc."
              />
              
              <div>
                <InputField
                  label="Team Size *"
                  name="minTeamSize"
                  type="number"
                  register={register}
                  error={errors.minTeamSize}
                />
              </div>
            </div>
            
            <InputField
              label="Required Documents *"
              name="requiredDocuments"
              type="textarea"
              register={register}
              error={errors.requiredDocuments}
              placeholder="ID cards, waivers, etc."
            />
          </FormSection>

          {/* Submit button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Tournament...
                </>
              ) : (
                'Publish Tournament'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentCreatePage;