import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BarChart3, User } from "lucide-react";
import { microLevelContributions, calculateMicroLevelTotal } from '../data/microLevelContributions';
import { isCurrentUserHeadOfDepartment } from '../utils/roleCheck';

const DepartmentAchievementTable = ({
    facultyData,
    onViewDetails
}) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContribution, setSelectedContribution] = useState('all');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [isHeadOfDepartment, setIsHeadOfDepartment] = useState(false);
    const [isLoadingRole, setIsLoadingRole] = useState(true);

    // Check user's role from database
    useEffect(() => {
        async function checkUserRole() {
            try {
                setIsLoadingRole(true);
                const isHead = await isCurrentUserHeadOfDepartment();
                setIsHeadOfDepartment(isHead === true);
            } catch (error) {
                console.error('Error checking user role:', error);
                setIsHeadOfDepartment(false);
            } finally {
                setIsLoadingRole(false);
            }
        }
        checkUserRole();
    }, []);

    // Get unique departments
    const departments = Array.from(new Set(facultyData.map(f => f.department)));

    // Filter faculty based on search and filters
    const filteredFaculty = facultyData.filter(faculty => {
        const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faculty.department.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = selectedDepartment === 'all' ||
            faculty.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    // Calculate total for a specific contribution type
    const calculateTotal = (contributionKey) => {
        if (contributionKey === 'all') return 0;
        return filteredFaculty.reduce((sum, faculty) => sum + (faculty[contributionKey] || 0), 0);
    };

    // Get top performer for a contribution type
    const getTopPerformer = (contributionKey) => {
        if (contributionKey === 'all') return null;
        return filteredFaculty.reduce((top, faculty) =>
            (faculty[contributionKey] || 0) > (top?.[contributionKey] || 0) ? faculty : top, null);
    };

    // Handle view individual graph
    const handleViewGraph = (faculty) => {
        navigate(`/faculty-stats/${faculty.id}`);
    };

    return (
        <Card className="w-full">
            <CardHeader className="space-y-4">
                {/* Title */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <CardTitle className="text-xl font-bold dark:text-white">Department Achievement Overview (Micro-Level - 40%)</CardTitle>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search faculty by name or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-12 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                            <SelectTrigger className="h-12 px-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-w-[140px]">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedContribution} onValueChange={setSelectedContribution}>
                            <SelectTrigger className="h-12 px-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-w-[180px]">
                                <SelectValue placeholder="Contribution Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Contributions</SelectItem>
                                {microLevelContributions.map((type) => (
                                    <SelectItem key={type.key} value={type.key}>{type.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Contribution Summary */}
                {selectedContribution !== 'all' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50 shadow-sm">
                        <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                            <div className="text-2xl font-bold text-blue-700">
                                {calculateTotal(selectedContribution)}
                            </div>
                            <div className="text-sm text-blue-600 font-medium">Total</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                            <div className="text-2xl font-bold text-green-700">
                                {Math.round(calculateTotal(selectedContribution) / filteredFaculty.length) || 0}
                            </div>
                            <div className="text-sm text-green-600 font-medium">Average</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                            <div className="text-lg font-semibold text-purple-700 truncate">
                                {getTopPerformer(selectedContribution)?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-purple-600 font-medium">Top Performer</div>
                        </div>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto relative">
                    <div className="sticky-table">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-tableHeader">
                                    <TableHead
                                        className="font-semibold dark:text-white min-w-[200px]"
                                        style={{ position: 'sticky', left: 0, zIndex: 20, backgroundColor: '#f3f4f6' }}
                                    >
                                        Faculty Name
                                    </TableHead>
                                    <TableHead className="font-semibold dark:text-white min-w-[150px]">Designation</TableHead>
                                    <TableHead className="font-semibold dark:text-white min-w-[150px]">Department</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[180px]">Reducing Fee Defaulters</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[220px]">Reducing Dress Code Defaulters</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[180px]">Timely Completion of Work</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[180px]">Punctuality to Class & Lab</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[150px]">Classroom Teaching</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[170px]">Volunteering Behavior</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[200px]">Timely Mentor Report</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[200px]">Timely Course File</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[140px]">Microteaching</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[120px]">Floor Duty</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[200px]">Innovative Lab Conduct</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[220px]">QP Setting (Blooms)</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[160px]">NBA Contribution</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[180px]">Placement Contribution</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[120px]">Loss of Pay</TableHead>
                                    <TableHead className="font-semibold text-center dark:text-white min-w-[120px]">Total Score</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredFaculty.map((faculty) => (
                                    <TableRow
                                        key={faculty.id}
                                        className="hover:bg-tableHover transition-colors"
                                    >
                                        <TableCell
                                            className="font-medium dark:text-white min-w-[200px]"
                                            style={{ position: 'sticky', left: 0, zIndex: 20, backgroundColor: 'white' }}
                                        >
                                            <div>
                                                <div className="font-semibold dark:text-white">{faculty.name}</div>
                                                {isHeadOfDepartment === true ? (
                                                    <div className="text-sm text-muted-foreground dark:text-white">{faculty.id}</div>
                                                ) : null}
                                            </div>
                                        </TableCell>
                                        <TableCell className="dark:text-white min-w-[150px]">
                                            {faculty.designation}
                                        </TableCell>
                                        <TableCell className="dark:text-white min-w-[150px]">
                                            <Badge variant="secondary" className="text-xs dark:text-white">
                                                {faculty.department}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.reducing_fee_defaulters || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.reducing_dress_code_defaulters || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.timely_completion_work || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.punctuality_class_lab || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.classroom_teaching || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.volunteering_behavior || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.timely_mentor_report || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.timely_course_file || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.microteaching || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.floor_duty || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.innovative_lab_conduct || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.qp_setting_blooms || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.nba_contribution || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.placement_contribution || 0}</TableCell>
                                        <TableCell className="text-center dark:text-white">{faculty.loss_of_pay || 0}</TableCell>
                                        <TableCell className="text-center font-bold text-blue-700 dark:text-blue-400">
                                            {calculateMicroLevelTotal(faculty)}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                    {filteredFaculty.map((faculty) => (
                        <Card key={faculty.id} className="p-5 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50">
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{faculty.name}</h3>
                                                {isHeadOfDepartment === true ? (
                                                    <p className="text-xs text-gray-500 font-mono">{faculty.id}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                                                {faculty.designation}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                                                {faculty.department}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleViewGraph(faculty)}
                                            className="h-10 w-10 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                                            title="View Individual Graph"
                                        >
                                            <BarChart3 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Total Score */}
                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl border border-blue-200/50">
                                    <div className="text-xs text-blue-700 font-semibold mb-1">Total Micro-Level Score</div>
                                    <div className="text-3xl font-bold text-blue-800">
                                        {calculateMicroLevelTotal(faculty)}
                                    </div>
                                </div>

                                {/* Key Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                                        <div className="text-xs text-green-700 font-semibold mb-1">Fee Defaulters</div>
                                        <div className="text-xl font-bold text-green-800">{faculty.reducing_fee_defaulters || 0}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                                        <div className="text-xs text-purple-700 font-semibold mb-1">Punctuality</div>
                                        <div className="text-xl font-bold text-purple-800">{faculty.punctuality_class_lab || 0}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200/50">
                                        <div className="text-xs text-orange-700 font-semibold mb-1">NBA Contribution</div>
                                        <div className="text-xl font-bold text-orange-800">{faculty.nba_contribution || 0}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200/50">
                                        <div className="text-xs text-pink-700 font-semibold mb-1">Placement</div>
                                        <div className="text-xl font-bold text-pink-800">{faculty.placement_contribution || 0}</div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="bg-gray-50/50 rounded-lg p-3 space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium">Classroom Teaching:</span>
                                        <span className="font-bold text-gray-900">{faculty.classroom_teaching || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium">Volunteering:</span>
                                        <span className="font-bold text-gray-900">{faculty.volunteering_behavior || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium">Microteaching:</span>
                                        <span className="font-bold text-gray-900">{faculty.microteaching || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredFaculty.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No faculty members found matching your criteria.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DepartmentAchievementTable;
