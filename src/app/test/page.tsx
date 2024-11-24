"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    socialStyle: "",
    decisionMaking: "",
    educationLevel: "",
    latestGrade: "",
    favoriteSubjects: "",
    careerPaths: "",
    hobbies: "",
    skills: "",
    motivation: "",
    examHandling: "",
    shortTermGoals: "",
    longTermGoals: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Replace with actual API call if needed
    router.push("/dashboard"); // Redirect to the Student Dashboard
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Student Onboarding</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg w-full max-w-3xl p-8 space-y-6 border border-green-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700">Social Interaction Style</label>
            <select
              name="socialStyle"
              value={formData.socialStyle}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>Select Style</option>
              <option value="Introvert">Introvert</option>
              <option value="Extrovert">Extrovert</option>
              <option value="Ambivert">Ambivert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700">Decision-Making Approach</label>
            <select
              name="decisionMaking"
              value={formData.decisionMaking}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>Select Approach</option>
              <option value="Thinker">Thinker</option>
              <option value="Feeler">Feeler</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-700">Current Level of Education</label>
          <input
            type="text"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Latest Grade in Last Degree</label>
            <input
              type="text"
              name="latestGrade"
              value={formData.latestGrade}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700">Favorite Subjects</label>
            <input
              type="text"
              name="favoriteSubjects"
              value={formData.favoriteSubjects}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-700">Interested Career Paths or Fields</label>
          <textarea
            name="careerPaths"
            value={formData.careerPaths}
            onChange={handleChange}
            className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
            rows={2}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-700">Motivation to Study</label>
          <select
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="" disabled>Select Motivation</option>
            <option value="Grades">Grades</option>
            <option value="Knowledge">Knowledge</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Curiosity">Curiosity</option>
            <option value="Peer Competition">Peer Competition</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:ring-4 focus:ring-green-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
