// src/pages/employee/ProfileSettings.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  department?: string;
  designation?: string;
  profilePic?: string;
};

export default function ProfileSettings() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const token = localStorage.getItem("employeeToken");

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const userData = res.data.user;
        setUser(userData);
        setFormData({
          name: userData.name || "",
          department: userData.department || "",
          designation: userData.designation || "",
        });
        if (userData.profilePic) {
          setPreviewImage(`${BASE_URL}${userData.profilePic}`);
        }
      }
    } catch (err) {
      console.error("Failed to load profile", err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile (name, department, designation)
  const handleUpdateProfile = async () => {
  if (!formData.name.trim()) {
    alert("Name is required");
    return;
  }

  setSaving(true);
  try {
    const res = await axios.put(
      `${BASE_URL}/api/profile/me`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.success) {
      const updatedUserFromBackend = res.data.user;

      // Preserve existing profilePic if it exists
      const updatedUser = {
        ...updatedUserFromBackend,
        profilePic: user?.profilePic || updatedUserFromBackend.profilePic || undefined,
      };

      setUser(updatedUser);
      localStorage.setItem("employeeUser", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");

      window.dispatchEvent(new Event("profileUpdated"));
    }
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to update profile");
  } finally {
    setSaving(false);
  }
};

  // Upload profile picture
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Immediate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    setUploading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/profile/upload-profile-pic`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        const newImageUrl = `${BASE_URL}${res.data.imageUrl}`;
        setPreviewImage(newImageUrl);

        const updatedUser = { ...user!, profilePic: res.data.imageUrl };
        setUser(updatedUser);
        localStorage.setItem("employeeUser", JSON.stringify(updatedUser));

        alert("Profile picture uploaded successfully!");

        // ← IMPORTANT: Notify layout to update header avatar instantly
        window.dispatchEvent(new Event("profileUpdated"));
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload failed");
      setPreviewImage(user?.profilePic ? `${BASE_URL}${user.profilePic}` : null);
    } finally {
      setUploading(false);
    }
  };

  // Get initials
  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    const first = names[0]?.[0] || "";
    const last = names.length > 1 ? names[names.length - 1]?.[0] : "";
    return (first + last).toUpperCase() || "U";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
           <div className="w-8 h-8 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
           <p className="text-slate-500 font-medium animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile information and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Avatar Section */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-0 shadow-lg shadow-slate-200/50 overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
               <div className="absolute inset-0 bg-white/10" />
            </div>
            <CardContent className="flex flex-col items-center -mt-16 px-6 pb-8">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-[4px] border-white shadow-xl bg-white">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 font-bold text-4xl">
                       {getInitials(user?.name || "User")}
                    </div>
                  )}
                </Avatar>
                <Label 
                  htmlFor="picture" 
                  className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-lg border border-slate-100 cursor-pointer hover:scale-110 active:scale-95 transition-all text-slate-600 hover:text-indigo-600"
                  title="Change Photo"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </Label>
              </div>

              <div className="text-center mt-4 space-y-1">
                 <h2 className="text-xl font-bold text-slate-800">{user?.name || "Employee"}</h2>
                 <p className="text-sm font-medium text-slate-500">{user?.email}</p>
                 {user?.designation && <div className="inline-flex mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">{user.designation}</div>}
              </div>

              <input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </CardContent>
          </Card>

           <div className="rounded-2xl bg-blue-50/50 border border-blue-100 p-4 text-sm text-blue-800">
              <p className="font-semibold mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                Pro Tip
              </p>
              Uploaded images are automatically resized. Use a square image for best results.
           </div>
        </div>

        {/* Right: Profile Form */}
        <div className="lg:col-span-8">
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader className="border-b border-slate-50 px-8 py-6">
                 <div>
                    <CardTitle className="text-xl">Profile Details</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">Update your personal information.</p>
                 </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-600">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-lg bg-slate-50/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-600">Email Address</Label>
                    <div className="relative">
                        <Input 
                            value={user?.email || ""} 
                            disabled 
                            className="h-11 border-slate-200 bg-slate-100 text-slate-500 rounded-lg pl-10"
                        />
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-3.5 text-slate-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-slate-600">Department</Label>
                     <div className="relative">
                        <Input
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          placeholder="Engineering"
                          className="h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-lg pl-10 bg-slate-50/50"
                        />
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-3.5 text-slate-400"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/></svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-slate-600">Designation</Label>
                    <div className="relative">
                        <Input
                          id="designation"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder="Senior Developer"
                          className="h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-lg pl-10 bg-slate-50/50"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-3.5 text-slate-400"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-50">
                  <Button 
                    onClick={handleUpdateProfile} 
                    disabled={saving}
                    className="h-11 px-8 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-lg transition-all active:scale-95"
                  >
                    {saving ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Saving...
                        </span>
                    ) : (
                        "Save Changes"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}