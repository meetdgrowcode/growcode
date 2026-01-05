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
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Avatar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <Avatar className="h-32 w-32 text-4xl">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                getInitials(user?.name || "User")
              )}
            </Avatar>

            <div className="w-full">
              <Label htmlFor="picture" className="cursor-pointer">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={uploading}
                  asChild
                >
                  <label htmlFor="picture">
                    {uploading ? "Uploading..." : "Change Photo"}
                  </label>
                </Button>
              </Label>
              <input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                JPG, PNG up to 5MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right: Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={user?.email || ""} disabled />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Engineering"
                />
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g., Frontend Developer"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleUpdateProfile} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}