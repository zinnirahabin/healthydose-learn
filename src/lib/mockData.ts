import { Moon, Brain, Dumbbell, Salad, Scale, Sparkles, type LucideIcon } from "lucide-react";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoId: string;
  description: string;
  notes: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  duration: string;
  progress: number;
  lessons: Lesson[];
  icon: LucideIcon;
  color: string;
  points: number;
  enrolled: boolean;
}

export const programs: Program[] = [
  {
    id: "better-sleep",
    title: "Better Sleep Habits",
    category: "Sleep",
    description: "Master the science of restorative sleep for peak student performance.",
    longDescription: "Sleep is the foundation of learning, memory, and emotional balance. This program walks you through evidence-based routines to fall asleep faster, stay asleep longer, and wake up energized — even during exam season.",
    duration: "2h 30m",
    progress: 65,
    icon: Moon,
    color: "from-indigo-400 to-purple-400",
    points: 250,
    enrolled: true,
    lessons: [
      { id: "l1", title: "The Science of Sleep", duration: "12 min", videoId: "5MuIMqhT8DM", description: "Why sleep matters for students", notes: "Sleep consolidates memory and clears metabolic waste from the brain. Aim for 7–9 hours nightly." },
      { id: "l2", title: "Building a Sleep Routine", duration: "15 min", videoId: "t0kACis_dJE", description: "Crafting your wind-down ritual", notes: "A consistent bedtime trains your circadian rhythm. Dim lights 1 hour before bed." },
      { id: "l3", title: "Beating Screen Addiction", duration: "10 min", videoId: "VQR-7tcvZpA", description: "Blue light and your brain", notes: "Blue light suppresses melatonin. Use night mode or stop screens 30 min before sleep." },
      { id: "l4", title: "Napping Like a Pro", duration: "8 min", videoId: "0vrdgDdPApQ", description: "Strategic power naps", notes: "20-minute naps boost alertness without grogginess. Avoid napping after 3pm." },
    ],
  },
  {
    id: "stress-management",
    title: "Stress Management for Students",
    category: "Mental Wellness",
    description: "Practical tools to manage academic pressure and anxiety.",
    longDescription: "Learn breathwork, cognitive reframing, and time-boxing strategies designed for student life. Reduce overwhelm and reclaim focus.",
    duration: "3h 10m",
    progress: 30,
    icon: Brain,
    color: "from-blue-400 to-cyan-400",
    points: 300,
    enrolled: true,
    lessons: [
      { id: "l1", title: "Understanding Stress", duration: "14 min", videoId: "hnpQrMqDoqE", description: "Good stress vs bad stress", notes: "Acute stress sharpens focus. Chronic stress impairs memory and immunity." },
      { id: "l2", title: "Box Breathing Technique", duration: "9 min", videoId: "tEmt1Znux58", description: "Calm in 4 minutes", notes: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times." },
      { id: "l3", title: "Reframing Negative Thoughts", duration: "16 min", videoId: "8jPQjjsBbIc", description: "CBT basics for students", notes: "Identify the thought, evaluate evidence, generate a balanced alternative." },
    ],
  },
  {
    id: "fitness-beginner",
    title: "Beginner Fitness Routine",
    category: "Fitness",
    description: "20-minute workouts that fit between classes.",
    longDescription: "No gym, no equipment, no excuses. Build strength, mobility, and stamina with short bodyweight sessions you can do in your dorm room.",
    duration: "4h 00m",
    progress: 0,
    icon: Dumbbell,
    color: "from-emerald-400 to-teal-400",
    points: 400,
    enrolled: false,
    lessons: [
      { id: "l1", title: "Movement Fundamentals", duration: "12 min", videoId: "ml6cT4AZdqI", description: "Squat, hinge, push, pull", notes: "Master form before adding intensity. Quality reps over quantity." },
      { id: "l2", title: "Dorm Room Full-Body", duration: "20 min", videoId: "UBMk30rjy0o", description: "No equipment needed", notes: "3 rounds: 10 squats, 10 push-ups, 20s plank. Rest 60s between rounds." },
      { id: "l3", title: "Mobility & Recovery", duration: "15 min", videoId: "L_xrDAtykMI", description: "Stretch like it matters", notes: "Daily 10-min mobility prevents study-posture pain." },
    ],
  },
  {
    id: "healthy-eating",
    title: "Healthy Eating Basics",
    category: "Nutrition",
    description: "Eat well on a student budget and a packed schedule.",
    longDescription: "Build meals that fuel focus without breaking the bank. Meal prep, grocery hacks, and the truth about supplements.",
    duration: "2h 45m",
    progress: 45,
    icon: Salad,
    color: "from-green-400 to-lime-400",
    points: 275,
    enrolled: true,
    lessons: [
      { id: "l1", title: "Macros Made Simple", duration: "13 min", videoId: "fqhYBTg73fw", description: "Protein, carbs, fats", notes: "Aim for protein at every meal — it stabilizes energy and satiety." },
      { id: "l2", title: "Budget Grocery Shopping", duration: "11 min", videoId: "K-Lk-iqHX8U", description: "Eat well for less", notes: "Buy frozen veg, eggs, oats, beans, and seasonal produce." },
      { id: "l3", title: "Brain Foods for Studying", duration: "10 min", videoId: "ATC0WGCRgcs", description: "What to eat before exams", notes: "Berries, fatty fish, nuts, and dark chocolate support cognition." },
    ],
  },
  {
    id: "study-balance",
    title: "Study-Life Balance",
    category: "Productivity",
    description: "Get more done without burning out.",
    longDescription: "Time blocking, deep work, and the art of saying no. Designed for the modern overcommitted student.",
    duration: "3h 30m",
    progress: 10,
    icon: Scale,
    color: "from-violet-400 to-fuchsia-400",
    points: 350,
    enrolled: true,
    lessons: [
      { id: "l1", title: "The Pomodoro Method", duration: "10 min", videoId: "mNBmG24djoY", description: "Focus in sprints", notes: "25 min focused work, 5 min break. Every 4 cycles take a 15-min break." },
      { id: "l2", title: "Time Blocking 101", duration: "14 min", videoId: "M1Vz_yGm7r8", description: "Design your week", notes: "Assign every hour a purpose. Treat appointments with yourself as sacred." },
      { id: "l3", title: "Saying No Gracefully", duration: "9 min", videoId: "8c-DGtuc-uc", description: "Protect your energy", notes: "Every yes is a no to something else. Choose intentionally." },
    ],
  },
  {
    id: "daily-routines",
    title: "Energizing Daily Routines",
    category: "Lifestyle",
    description: "Morning and evening habits of high-performing students.",
    longDescription: "Small rituals, compounded daily, transform your life. Build a stack that works for you.",
    duration: "2h 15m",
    progress: 0,
    icon: Sparkles,
    color: "from-amber-400 to-orange-400",
    points: 225,
    enrolled: false,
    lessons: [
      { id: "l1", title: "The Perfect Morning", duration: "12 min", videoId: "iG9CE55wbtY", description: "Win the first hour", notes: "Hydrate, sunlight, movement, intention — in that order." },
      { id: "l2", title: "Evening Shutdown Ritual", duration: "10 min", videoId: "QPLOLXZdMz4", description: "Close the day cleanly", notes: "Review wins, plan tomorrow, then disconnect." },
    ],
  },
];

export const categories = ["All", "Sleep", "Mental Wellness", "Fitness", "Nutrition", "Productivity", "Lifestyle"];

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export const sampleQuiz: Record<string, QuizQuestion[]> = {
  default: [
    { question: "How many hours of sleep do most students need each night?", options: ["4-5 hours", "5-6 hours", "7-9 hours", "10+ hours"], correct: 2 },
    { question: "Which breathing technique helps calm the nervous system quickly?", options: ["Rapid breathing", "Box breathing", "Holding breath", "Mouth breathing"], correct: 1 },
    { question: "What is the recommended Pomodoro work interval?", options: ["10 minutes", "25 minutes", "45 minutes", "90 minutes"], correct: 1 },
    { question: "Which food group best supports brain function?", options: ["Refined sugars", "Fatty fish & berries", "Processed meats", "Soft drinks"], correct: 1 },
    { question: "What should you do 30 minutes before bed?", options: ["Drink coffee", "Scroll social media", "Avoid screens", "Heavy workout"], correct: 2 },
  ],
};

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  points: number;
}

export const achievements: Achievement[] = [
  { id: "a1", title: "First Steps", description: "Complete your first lesson", icon: "🌱", earned: true, points: 50 },
  { id: "a2", title: "Sleep Champion", description: "Finish the Better Sleep program", icon: "🌙", earned: true, points: 250 },
  { id: "a3", title: "Mindful Master", description: "Complete 5 meditation lessons", icon: "🧘", earned: true, points: 150 },
  { id: "a4", title: "Quiz Whiz", description: "Score 100% on any quiz", icon: "🏆", earned: false, points: 200 },
  { id: "a5", title: "Streak Star", description: "Learn 7 days in a row", icon: "🔥", earned: true, points: 175 },
  { id: "a6", title: "Wellness Guru", description: "Complete 3 full programs", icon: "💎", earned: false, points: 500 },
];

export const mockUser = {
  name: "Alex Morgan",
  email: "alex.morgan@university.edu",
  avatar: "AM",
  totalPoints: 1245,
  streak: 12,
  programsCompleted: 2,
  level: "Wellness Apprentice",
};
