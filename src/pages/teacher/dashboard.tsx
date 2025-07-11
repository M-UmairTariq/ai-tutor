import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const students = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar:
      "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 3,
    progress: 78,
    lastActive: "2 hours ago",
    status: "active",
    section: "A",
    performance: "high",
    ranking: 1,
    level: 3,
    activity: "active",
    contactNumber: "555-1234",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 2,
    progress: 45,
    lastActive: "1 day ago",
    status: "active",
    section: "B",
    performance: "medium",
    ranking: 2,
    level: 2,
    activity: "active",
    contactNumber: "555-5678",
  },
  {
    id: "3",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    avatar:
      "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 4,
    progress: 92,
    lastActive: "3 hours ago",
    status: "active",
    section: "A",
    performance: "high",
    ranking: 1,
    level: 3,
    activity: "active",
    contactNumber: "555-8765",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@example.com",
    avatar: "",
    courses: 1,
    progress: 12,
    lastActive: "5 days ago",
    status: "suspended",
    section: "B",
    performance: "low",
    ranking: 3,
    level: 1,
    activity: "suspended",
    contactNumber: "555-4321",
  },
  {
    id: "5",
    name: "Emily Chen",
    email: "emily.c@example.com",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 3,
    progress: 67,
    lastActive: "12 hours ago",
    status: "active",
    section: "A",
    performance: "medium",
    ranking: 2,
    level: 2,
    activity: "active",
    contactNumber: "555-2468",
  },
  {
    id: "6",
    name: "Olivia Taylor",
    email: "olivia.t@example.com",
    avatar:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 2,
    progress: 88,
    lastActive: "2 days ago",
    status: "active",
    section: "B",
    performance: "high",
    ranking: 1,
    level: 3,
    activity: "active",
    contactNumber: "555-1357",
  },
  {
    id: "7",
    name: "James Martin",
    email: "james.m@example.com",
    avatar: "",
    courses: 1,
    progress: 23,
    lastActive: "1 week ago",
    status: "suspended",
    section: "A",
    performance: "low",
    ranking: 3,
    level: 1,
    activity: "suspended",
    contactNumber: "555-9753",
  },
  {
    id: "8",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar:
      "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 3,
    progress: 78,
    lastActive: "2 hours ago",
    status: "active",
    section: "A",
    performance: "high",
    ranking: 1,
    level: 3,
    activity: "active",
    contactNumber: "555-1234",
  },
  {
    id: "9",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 2,
    progress: 45,
    lastActive: "1 day ago",
    status: "active",
    section: "B",
    performance: "medium",
    ranking: 2,
    level: 2,
    activity: "active",
    contactNumber: "555-5678",
  },
  {
    id: "10",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    avatar:
      "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 4,
    progress: 92,
    lastActive: "3 hours ago",
    status: "active",
    section: "A",
    performance: "high",
    ranking: 1,
    level: 3,
    activity: "active",
    contactNumber: "555-8765",
  },
  {
    id: "11",
    name: "David Wilson",
    email: "david.w@example.com",
    avatar: "",
    courses: 1,
    progress: 12,
    lastActive: "5 days ago",
    status: "suspended",
    section: "B",
    performance: "low",
    ranking: 3,
    level: 1,
    activity: "suspended",
    contactNumber: "555-4321",
  },
  {
    id: "12",
    name: "Emily Chen",
    email: "emily.c@example.com",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 3,
    progress: 67,
    lastActive: "12 hours ago",
    status: "active",
    section: "A",
    performance: "medium",
    ranking: 2,
    level: 2,
    activity: "active",
    contactNumber: "555-2468",
  },
  {
    id: "13",
    name: "Olivia Taylor",
    email: "olivia.t@example.com",
    avatar:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courses: 2,
    progress: 88,
    lastActive: "2 days ago",
    status: "active",
    section: "B",
    performance: "high",
    ranking: 1,
    level: 3,
    activity: "active",
    contactNumber: "555-1357",
  },
  {
    id: "14",
    name: "James Martin",
    email: "james.m@example.com",
    avatar: "",
    courses: 1,
    progress: 23,
    lastActive: "1 week ago",
    status: "suspended",
    section: "A",
    performance: "low",
    ranking: 3,
    level: 1,
    activity: "suspended",
    contactNumber: "555-9753",
  },
];

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [rankingFilter, setRankingFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter students based on search term and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    const matchesSection =
      sectionFilter === "all" || student.section === sectionFilter;
    const matchesPerformance =
      performanceFilter === "all" || student.performance === performanceFilter;
    const matchesRanking =
      rankingFilter === "all" ||
      (rankingFilter === "top" && student.ranking === 1) ||
      (rankingFilter === "average" && student.ranking === 2) ||
      (rankingFilter === "low" && student.ranking === 3);
    const matchesLevel =
      levelFilter === "all" || student.level === Number(levelFilter);
    const matchesActivity =
      activityFilter === "all" || student.activity === activityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesSection &&
      matchesPerformance &&
      matchesRanking &&
      matchesLevel &&
      matchesActivity
    );
  });

  // Sort students based on the selected sort criteria
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "ranking":
        return a.ranking - b.ranking;
      case "level":
        return a.level - b.level;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedStudents.length / pageSize);
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    sectionFilter,
    performanceFilter,
    rankingFilter,
    levelFilter,
    activityFilter,
    sortBy,
  ]);

  const getStatusBadge = (status: string) => {
    const baseClass =
      "bg-opacity-100 text-opacity-100 font-medium px-3 py-1 rounded-md pointer-events-none select-none";

    switch (status) {
      case "active":
        return (
          <Badge className={`bg-green-100 text-green-700 ${baseClass}`}>
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge className={`bg-red-100 text-red-600 ${baseClass}`}>
            Suspended
          </Badge>
        );
      case "inactive":
        return (
          <Badge className={`bg-gray-200 text-gray-700 ${baseClass}`}>
            Inactive
          </Badge>
        );
      default:
        return (
          <Badge className={`bg-gray-300 text-gray-800 ${baseClass}`}>
            Unknown
          </Badge>
        );
    }
  };

  const applyFilters = () => {
    // this isn't functional yet
  };

  return (
    <div>
      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex justify-between items-center w-full flex-wrap gap-4">
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "suspended" ? "default" : "outline"}
              onClick={() => setStatusFilter("suspended")}
            >
              Suspended
            </Button>
            <Button
              variant={statusFilter === "inactive" ? "default" : "outline"}
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              onClick={() => setStatusFilter("active")}
            >
              Active
            </Button>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--font-light2)]" />
              <Input
                className="pl-9 w-full"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="ranking">Ranking</SelectItem>
                <SelectItem value="level">Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-start gap-2 w-full">
          <div className="flex flex-wrap gap-2 flex-1">
            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger className="flex-1 min-w-[140px]">
                <SelectValue placeholder="All Sections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={performanceFilter}
              onValueChange={setPerformanceFilter}
            >
              <SelectTrigger className="flex-1 min-w-[140px]">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Performance</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={rankingFilter} onValueChange={setRankingFilter}>
              <SelectTrigger className="flex-1 min-w-[140px]">
                <SelectValue placeholder="Ranking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Rankings</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="flex-1 min-w-[140px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Levels</SelectItem>
                <SelectItem value="1">Level 1</SelectItem>
                <SelectItem value="2">Level 2</SelectItem>
                <SelectItem value="3">Level 3</SelectItem>
              </SelectContent>
            </Select>

            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="flex-1 min-w-[140px]">
                <SelectValue placeholder="Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Activity</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Apply Filter Button */}
          <Button
            className="bg-[#F1F3FF] text-primary hover:bg-primary hover:text-white hover:shadow-md transition-colors w-full sm:w-auto"
            onClick={applyFilters}
          >
            Apply Filter
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <Card>
        <CardContent>
          {/* Responsive Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Email Address</TableHead>
                  <TableHead className="text-center">Contact Number</TableHead>
                  <TableHead className="text-center">Section</TableHead>
                  <TableHead className="text-center">Level</TableHead>
                  <TableHead className="text-center">Ranking</TableHead>
                  <TableHead className="text-center">Account Status</TableHead>
                  <TableHead className="!pl-8 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow className="h-20" key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-[var(--font-light2)]">
                              <a
                                href={`/profile/${student.id}`}
                                className="text-blue-500 flex items-center gap-1"
                              >
                                View Profile{" "}
                                <ArrowUpRight className="w-4 h-4 text-blue-500" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {student.email}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.contactNumber}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.section}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.level}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold">{student.ranking}</span>
                        <span className="text-xs">/20</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(student.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          className="bg-[#F1F3FF] text-primary hover:bg-primary hover:text-white hover:shadow-md transition-colors"
                          size="sm"
                        >
                          Assign Task
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <p className="text-[var(--font-light2)] mb-2">
                        No students found matching your criteria.
                      </p>
                      {searchTerm && (
                        <Button
                          onClick={() => setSearchTerm("")}
                          variant="outline"
                        >
                          Clear Search
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Card Layout for Mobile */}
          <div className="block sm:hidden">
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student) => (
                <div
                  key={student.id}
                  className="border rounded-lg p-4 mt-4 mb-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-[var(--font-light2)]">
                        <a
                          href={`/profile/${student.id}`}
                          className="text-blue-500 flex items-center gap-1"
                        >
                          View Profile{" "}
                          <ArrowUpRight className="w-4 h-4 text-blue-500" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      <strong>Email:</strong> {student.email}
                    </p>
                    <p>
                      <strong>Contact:</strong> {student.contactNumber}
                    </p>
                    <p>
                      <strong>Section:</strong> {student.section}
                    </p>
                    <p>
                      <strong>Level:</strong> {student.level}
                    </p>
                    <p>
                      <strong>Ranking:</strong> {student.ranking}/20
                    </p>
                    <p>
                      <strong>Status:</strong> {getStatusBadge(student.status)}
                    </p>
                  </div>
                  <Button
                    className="bg-[#F1F3FF] text-primary hover:bg-primary hover:text-white hover:shadow-md transition-colors mt-2"
                    size="sm"
                  >
                    Assign Task
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-[var(--font-light2)]">
                No students found matching your criteria.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "font-bold" : ""}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
