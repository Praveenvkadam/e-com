import { useState } from "react";
import { useDispatch } from "react-redux";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { updateUserProfile } from "@/redux/slices/authSlice";

export default function EditProfile({ user, onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateUserProfile(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 rounded-2xl space-y-4">
        <h2 className="text-lg font-semibold">Edit Profile</h2>

        <Input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          name="address"
          placeholder="Shipping address"
          value={form.address}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}
