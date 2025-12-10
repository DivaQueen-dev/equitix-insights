import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Calendar, Settings, LogOut, Save } from "lucide-react";

export default function Profile() {
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    updateUser({ name, email });
    setIsEditing(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const joinedDate = user?.joinedDate
    ? new Date(user.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-semibold mb-8">Profile</h1>

          {/* Profile Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{user?.name || "User"}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <span className="text-sm text-muted-foreground">Email</span>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <span className="text-sm text-muted-foreground">Member since</span>
                      <p className="font-medium">{joinedDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="mt-4">
                    <Settings className="w-4 h-4 mr-2" />Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="text-2xl font-semibold">12</div>
                  <div className="text-sm text-muted-foreground">Stocks Analyzed</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="text-2xl font-semibold">5</div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="text-2xl font-semibold">3</div>
                  <div className="text-sm text-muted-foreground">Watchlist Items</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Button variant="destructive" onClick={handleLogout} className="w-full">
            <LogOut className="w-4 h-4 mr-2" />Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
