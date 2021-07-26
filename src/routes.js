import React from "react";
import HomePage from "./pages/HomePage/Home";
import ThaoLuanPage from "./pages/ThaoLuanPage/ThaoLuanPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ThaoLuanChiTietPage from "./pages/ThaoLuanPage/ThaoLuanChiTietPage";
import TuDienPage from "./pages/XemThemPage/TuDienPage";
import TuVungPage from "./pages/XemThemPage/TuVungPage";
import SignInPage from "./pages/AuthPage/SignInPage";
import SignUpPage from "./pages/AuthPage/SignUpPage";
import Admin from "./pages/Admin/Admin";
import ManagementWord from "./pages/Admin/ManagementWord";
import HocHinhAnh from "./pages/HocPage/HocHinhAnh";
import Hoc from "./pages/HocPage/Hoc";
// import CaiDatMatKhau from './pages/CaiDatPage/CaiDatMatKhau';
// import CaiDatTaiKhoan from './pages/CaiDatPage/CaiDatTaiKhoan';
import FlashCardPage from "./pages/FlashCardPage/FlashCardPage";
import ThemBaiViet from "./pages/ThaoLuanPage/ThemBaiViet";
import KetQuaTraCuu from "./pages/XemThemPage/KetQuaTraCuu";
import DapAnSai from "./pages/HocPage/DapAnSai";
import DapAnDung from "./pages/HocPage/DapAnDung";
import ExamPage from "./pages/Exam/ExamPage";
import Exam from "./pages/Exam/Exam";
import KetQuaExam from "./pages/HocPage/KetQuaExam";
import QuyenTruyCap from "./pages/NotFoundPage/QuyenTruyCap";
import ManagementInfor from "./pages/Admin/ManagementInfor";
import ManagementQuiz from "./pages/Admin/ManagementQuiz";
import ManagementExam from "./pages/Admin/ManagementExam";
import ManagementAccount from "./pages/Admin/ManagementAccount";
import ManagementScore from "./pages/Admin/ManagementScore";
import HistroriesExam from "./pages/HistoryPage/HistroriesExam";
import HistoriesTopup from "./pages/HistoryPage/HistoriesTopup";
import QuenMatKhau from "./pages/CaiDatPage/QuenMatKhau";
import CaiDatChung from "./pages/CaiDatPage/CaiDatChung";
import DanhSachThongBao from "./pages/ThongBao/DanhSachThongBao";
import ListQuiz from "./pages/HocPage/ListQuiz";
import DatLaiMatKhau from "./pages/CaiDatPage/DatLaiMatKhau";
import ManagementSection from "./pages/Admin/ManagementSection";
import Blog from "./pages/CaiDatPage/Blog";
import RankingExam from "./pages/RankingPage/RankingExam";
import RankingWord from "./pages/RankingPage/RankingWord";
import XacNhanEmail from "./pages/CaiDatPage/XacNhanEmail";
import ManagementQuiz_Exam from "./pages/Admin/ManagementQuiz_Exam";
import ManagementRole from "./pages/Admin/ManagementRole";
import FlashCard from "./pages/FlashCard/FlashCard";
import FlashCardDetail from "./pages/FlashCard/FlashCardDetail";
import Learn from "./pages/LearnPage/Learn";
import Progress from "./pages/Progress/Progress";
import Quiz_Exam from "./components/managementquiz_exam/Quiz_Exam";
import Quiz_Word from "./components/managementquiz_exam/Quiz_Word";
import QuizExam_User from "./components/managementquiz_exam/QuizExam_User";
import QuizExamPage from "./pages/QuizExamPage/QuizExamPage";
import SectionPage from "./pages/SectionPage/SectionPage";
import Section from "./components/managementsections/Section";
import ManagementGroupWord from "./pages/Admin/ManagementGroupWord";
import GroupWord from "./components/managementgroup_word/GroupWord";
import ProgressWord from "./pages/ProgressWord/ProgressWord";
import ManagementCategories from "./pages/Admin/ManagementCategories";
import SectionFlashcard from "./pages/FlashCard/SectionFlashcard";
import SectionResult from "./pages/FlashCard/SectionResult";
import VocabularyReview from "./pages/VocabularyReview/VocabularyReview";
import ConversationQuestion from "./components/question/ConversationQuestion";
import ArrangeQuestion from "./components/question/ArrangeQuestion";
import AnonymousSplashPage from "./pages/SplashPage/AnonymousSplash";
import ManagementRoutes from "./pages/Admin/ManagementRoutes";
import Sections from "./components/sections/Sections";
import QuizExamManagement from "./pages/Admin/ContentManagement/QuizExamManagement";
import PostCommentManagement from "./pages/Admin/ContentManagement/PostCommentManagement";
import RouteManagement from "./pages/Admin/ContentManagement/RouteManagement";
import ExampleManagement from "./pages/Admin/ContentManagement/ExampleManagement";
import MemoryManagement from "./pages/Admin/ContentManagement/MemoryManagement";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UserManagementRoutes from "./pages/Admin/User/UserManagementRoutes";
import Word from "./components/managementwords/Word";
import LearningHistory from "./pages/HistoryPage/LearningHistory";
import { ScriptTypes } from "./constants/ScriptTypes";
import CreateQuestion from "./components/question/CreateQuestion";
import QuestionCreate from "./components/question/QuestionCreate";
import ManagementQuestion from './pages/Admin/ManagementQuestion';
import ExamCreate from "./pages/Exam/ExamCreate";
import QuizCreate from "./pages/Quiz/QuizCreate";
import NewExamPage from "./pages/Exam/NewExamPage";
import ManagementcategoryTag from "./pages/Admin/ManagementCategoryTag";
import ManagementPost from "./pages/Admin/ManagementPost";
import ManagementCertificate from "./pages/Admin/ManagementCertificate";
import UserManagementCertificatae from "./pages/Admin/User/UserManagementCertificate";
import CertificateExam from "./pages/Exam/CertificateExam";
import ExamResult from "./pages/HocPage/ExamResult";
import { Chatbox } from "./pages/Chat/Chatbox";
const routes = [
  {
    path: "/splash",
    exact: true,
    main: () => <AnonymousSplashPage />,
    guard: false,
    roles: [],
  },
  {
    path: "/result",
    exact: true,
    main: () => <ExamResult />,
    guard: false,
    roles: [],
  },
  {
    path: "/test/:examId",
    exact: true,
    main: () => <NewExamPage />,
    guard: true,
    roles: [],
  },
  {
    path: "/certificate-review/:examId",
    exact: true,
    main: () => <CertificateExam />,
    guard: true,
    roles: [],
  },,
  {
    path: "/admin/quan-ly-exam/:examId/cai-dat",
    exact: true,
    main: () => <ExamCreate/>,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/admin/quan-ly-quiz/:quizId/cai-dat",
    exact: true,
    main: () => <QuizCreate/>,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/admin/quan-ly-exam/them",
    exact: true,
    main: () => <ExamCreate/>,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/chat",
    exact: true,
    main: () => <Chatbox />,
    guard: false,
    roles: [],
  },
  //Route cho phần học với script
  {
    path: `/routes/:routeId/sections/:sectionId/scripts/:scriptId`,
    exact: true,
    main: () => <SectionFlashcard />,
    guard: false,
    roles: []
  }, {
    path: '/sections/:sectionId/finish',
    exact: true,
    main: () => <SectionResult />,
    guard: true,
    roles: []
  },

  {
    path: "/home",
    exact: true,
    main: () => <HomePage />,
    guard: false,
    roles: [],
  },
  {
    path: "/cau-hoi",
    exact: true,
    main: () => <CreateQuestion />,
    guard: false,
    roles: [],
  },
  {
    path: "/vocabulary/progress",
    exact: true,
    main: () => <ProgressWord />,
    guard: false,
    roles: ["learner", "student"],
  },
  {
    path: '/vocabulary/review/:option',
    exact: true,
    main: () => <VocabularyReview />,
    guard: false,
    roles: []
  }
  ,
  {
    path: "/user/quanly-section",
    exact: true,
    main: () => <SectionPage />,
    // guard: false,
    // roles: []
  },
  {
    path: "/user/section",
    exact: true,
    main: () => <Section />,
    // guard: false,
    // roles: []
  },
  {
    path: "/blog",
    exact: true,
    main: (location) => <Blog location={location} />,
    guard: false,
    roles: [],
  },
  {
    path: "/ranking-exam",
    exact: true,
    main: () => <RankingExam />,
    // guard: false,
    // roles: []
  },
  {
    path: "/ranking-word",
    exact: true,
    main: () => <RankingWord />,
    guard: false,
    roles: [],
  },
  {
    path: "/list-quiz",
    exact: true,
    main: () => <ListQuiz />,
    guard: false,
    roles: [],
  },
  {
    path: "/xacnhan-email",
    exact: true,
    main: () => <XacNhanEmail />,
    guard: false,
    roles: [],
  },
  {
    path: "/",
    exact: true,
    main: () => <LandingPage />,
    guard: false,
    roles: [],
  },
  {
    path: "/thao-luan",
    exact: true,
    main: () => <ThaoLuanPage />,
    guard: false,
    roles: [],
  },
  {
    path: "/thao-luan/them-bai-viet",
    exact: true,
    main: () => <ThemBaiViet />,
    // guard: true,
    // roles: []
  },
  {
    path: "/thao-luan-chi-tiet/:postId",
    exact: true,
    main: (match) => <ThaoLuanChiTietPage match={match} />,
    guard: false,
    roles: [],
  },
  {
    path: "/cua-hang",
    exact: true,
    main: () => <CuaHangPage />,
    guard: false,
    roles: [],
  },
  {
    path: "/tu-dien",
    exact: true,
    main: () => <TuDienPage />,
    guard: false,
    roles: [],
  },
  {
    path: "/ketquatracuu",
    exact: true,
    main: (location) => <KetQuaTraCuu location={location} />,
    guard: false,
    roles: [],
  },
  {
    path: "/dapansai",
    exact: true,
    main: () => <DapAnSai />,
    guard: false,
    roles: [],
  },
  {
    path: "/dapandung",
    exact: true,
    main: () => <DapAnDung />,
    guard: false,
    roles: [],
  },
  {
    path: "/tu-vung",
    exact: true,
    main: () => <TuVungPage />,
    guard: false,
    roles: [],
  },
  {
    path: "/hochinhanh",
    exact: true,
    main: () => <HocHinhAnh />,
    guard: false,
    roles: [],
  },
  // {
  //     path: '/nap-tien',
  //     exact: true,
  //     main: () => <NapTienPage />,
  //     guard: false,
  //     roles: []
  // },
  {
    path: "/lichsu-naptien",
    exact: true,
    main: () => <HistoriesTopup />,
    guard: false,
    roles: [],
  },
  {
    path: "/ketqua-exam/:examId",
    exact: true,
    main: (match) => <KetQuaExam match={match} />,
    guard: false,
    roles: [],
  },
  {
    path: "/flashcard",
    exact: true,
    main: () => <FlashCardPage />,
    // guard: false,
    // roles: []
  },
  {
    path: "/card",
    exact: true,
    main: () => <FlashCard />,
    // guard: false,
    // roles: []
  },
  {
    path: "/card-detail/:cardId",
    exact: true,
    main: (match) => <FlashCardDetail match={match} />,
    // guard: false,
    // roles: []
  },
  {
    path: "/sections/:sectionId/learn",
    exact: true,
    main: (match) => <Learn match={match} />,
    // guard: false,
    // roles: []
  },
  // {
  //     path: '/caidatmatkhau',
  //     exact: true,
  //     main: () => <CaiDatMatKhau />,
  //     guard: true,
  //     roles: []
  // },
  // {
  //     path: '/caidattaikhoan',
  //     exact: true,
  //     main: () => <CaiDatTaiKhoan />,
  //     guard: true,
  //     roles: []
  // },
  {
    path: "/caidatchung",
    exact: true,
    main: () => <CaiDatChung />,
    // guard: true,
    // roles: []
  },
  {
    path: "/reset-password",
    exact: true,
    main: () => <DatLaiMatKhau />,
    guard: false,
    roles: [],
  },
  {
    path: "/thongbao",
    exact: true,
    main: () => <DanhSachThongBao />,
    // guard: true,
    // roles: []
  },
  {
    path: "/quenmatkhau",
    exact: true,
    main: () => <QuenMatKhau />,
    guard: false,
    roles: [],
  },
  {
    path: "/progress",
    exact: true,
    main: () => <Progress />,
    guard: true,
    roles: [],
  },
  {
    path: "/sections/:sectionId/do",
    exact: true,
    main: (match) => <Hoc match={match} />,
    guard: false,
    roles: [],
  },
  ,
  {
    path: "/practice",
    exact: true,
    main: (match) => <Hoc match={match} />,
    guard: true,
    roles: [],
  },
  {
    path: "/luyen-tap",
    exact: true,
    main: () => <Exam />,
    guard: false,
    roles: [],
  },
  {
    path: "/lichsu-exam",
    exact: true,
    main: () => <HistroriesExam />,
    guard: false,
    roles: [],
  },
  {
    path: "/exam/:examId",
    exact: true,
    main: (location) => <ExamPage location={location} />,
    guard: true,
    roles: [],
  },
  {
    path: "/signin",
    exact: true,
    main: (location) => <SignInPage location={location} />,
    guard: false,
    roles: [],
  },
  {
    path: "/signup",
    exact: true,
    main: (location) => <SignUpPage location={location} />,
    guard: false,
    roles: [],
  },
  {
    path: "/nguoi-dung/:accountId/quan-ly-tai-nguyen",
    exact: true,
    main: (match) => <QuizExamPage match={match} />,
    guard: true,
    roles: ["learner"],
  },
  {
    path: "/nguoi-dung/:accountId/quan-ly-chung-chi",
    exact: true,
    main: (match) => <UserManagementCertificatae />,
    guard: true,
    roles: ["learner"],
  },
  {
    path: "/nguoi-dung/:accountId/lich-su-hoc",
    exact: true,
    main: (match) => <LearningHistory />,
    guard: true,
    roles: ["learner"],
  },
  {
    path: "/nguoi-dung/:accountId/quan-ly-lo-trinh",
    exact: true,
    main: () => <UserManagementRoutes />,
    guard: true,
    roles: ["learner"],
  },
  {
    path: "/nguoi-dung/quiz-exam",
    exact: true,
    main: () => <QuizExam_User />,
    guard: true,
    roles: ["learner", "student"],
  },
  {
    path: "/user-quiz-exam",
    exact: true,
    main: (match) => <QuizExamPage match={match} />,
    guard: true,
    roles: ["learner", "teacher", "student"],
  },
  {
    path: "/admin",
    exact: true,
    main: () => <Admin />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/tuvung",
    exact: true,
    main: () => <Word />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-tag",
    exact: true,
    main: () => <ManagementcategoryTag />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-chung-chi",
    exact: true,
    main: () => <ManagementCertificate />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-bai-viet",
    exact: true,
    main: () => <ManagementPost />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-tu-vung",
    exact: true,
    main: () => <ManagementWord />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/quan-ly-group-word",
    exact: true,
    main: () => <ManagementGroupWord />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/group-word",
    exact: true,
    main: () => <GroupWord />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/quiz-tuvung",
    exact: true,
    main: () => <Quiz_Word />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-thong-bao",
    exact: true,
    main: () => <ManagementInfor />,
    guard: true,
    roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-cau-hoi",
    exact: true,
    main: () => <ManagementQuestion />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/admin/quan-ly-quiz",
    exact: true,
    main: () => <ManagementQuiz />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-quiz-exam",
    exact: true,
    main: () => <ManagementQuiz_Exam />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quiz-exam",
    exact: true,
    main: () => <Quiz_Exam />,
    // guard: true,
    // roles: ["superadmin", "manager"]
  },
  {
    path: "/admin/quan-ly-exam",
    exact: true,
    main: () => <ManagementExam />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/admin/quan-ly-bai-hoc",
    exact: true,
    main: () => <ManagementSection />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/admin/quan-ly-lo-trinh",
    exact: true,
    main: () => <ManagementRoutes />,
    guard: false,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/admin/quan-ly-lo-trinh/:routeId/bai-hoc",
    exact: true,
    main: () => <DndProvider backend={HTML5Backend}><Sections /></DndProvider>,
    guard: false,
    roles: ["superadmin", "manager"],
  },
  ,
  {
    path: "/admin/quan-ly-tai-khoan",
    exact: true,
    main: () => <ManagementAccount />,
    // guard: true,
    // roles: ["superadmin"]
  },
  {
    path: "/admin/quan-ly-bang-diem",
    exact: true,
    main: () => <ManagementScore />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/admin/quan-ly-phan-quyen",
    exact: true,
    main: () => <ManagementRole />,
    // guard: true,
    // roles: ["superadmin"]
  },
  {
    path: "/admin/quan-ly-nhom-tu",
    exact: true,
    main: () => <ManagementCategories />,
    guard: true,
    roles: ["superadmin"],
  },
  {
    path: '/admin/quan-ly-noi-dung/quiz-exam',
    exact: true,
    main: () => <QuizExamManagement />,
    guard: true,
    roles: ["superadmin"],
  },
  {
    path: '/admin/quan-ly-noi-dung/bai-viet-binh-luan',
    exact: true,
    main: () => <PostCommentManagement />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: '/admin/quan-ly-noi-dung/the-ghi-nho',
    exact: true,
    main: () => <MemoryManagement />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: '/admin/quan-ly-noi-dung/dong-gop',
    exact: true,
    main: () => <ExampleManagement />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: '/admin/quan-ly-noi-dung/lo-trinh',
    exact: true,
    main: () => <RouteManagement />,
    guard: true,
    roles: ["superadmin", "manager"],
  },
  {
    path: "/loi",
    exact: false,
    main: () => <NotFoundPage />,
    guard: false,
    roles: [],
  },
  {
    path: "/access-denied",
    exact: true,
    main: (location) => <QuyenTruyCap location={location} />,
    guard: false,
    roles: [],
  },
  {
    main: () => <NotFoundPage />,
  },
];

export default routes;
