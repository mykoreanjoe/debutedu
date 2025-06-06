import React from 'react';
import { Medal, BookOpen, MessageCircle, Sparkles, BookText, Target, Trophy, Award, Star } from 'lucide-react'; // Star, UserCircle, CheckCircle2, MessageSquareText 아이콘 삭제, Award, Star 아이콘 추가
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '데뷰인 | 데뷰 영어 학원',
  description: '데뷰 영어 학원의 자랑스러운 데뷰인들을 소개합니다. 아카데믹 챔피언, 스스로학습 챔피언 등 다양한 성과를 확인하세요.',
  openGraph: {
    title: '데뷰인 | 데뷰 영어 학원',
    description: '데뷰 영어 학원의 자랑스러운 데뷰인들을 소개합니다.',
    images: [
      {
        url: "/images/og-debutian.png", // 데뷰인 페이지 전용 OG 이미지 (가정)
        width: 1200,
        height: 630,
        alt: "데뷰인 페이지 OG 이미지",
      },
    ],
  },
};

const DebutianPage = () => {
  // 각 항목을 위한 데이터 구조 (추후 이미지 경로 등 추가 가능)
  const suzohabohaItems = [
    { name: '스터디북', icon: <BookOpen size={48} className="text-blue-500 mb-2" />, description: '초등 스터디북' },
    { name: '스피킹', icon: <MessageCircle size={48} className="text-green-500 mb-2" />, description: '초등 스피킹' },
    { name: '보 카', icon: <Sparkles size={48} className="text-yellow-500 mb-2" />, description: '초등 보카' },
    { name: '하브루타 문법', icon: <BookText size={48} className="text-purple-500 mb-2" />, description: '초등 하브루타 문법' },
  ];

  const sunebohaItems = [
    { name: '스터디북', icon: <BookOpen size={48} className="text-blue-500 mb-2" />, description: '중등 스터디북' },
    { name: '내신100점', icon: <Target size={48} className="text-red-500 mb-2" />, description: '중등 내신 100점' },
    { name: '보 카', icon: <Sparkles size={48} className="text-yellow-500 mb-2" />, description: '중등 보카' },
    { name: '하브루타 문법', icon: <BookText size={48} className="text-purple-500 mb-2" />, description: '중등 하브루타 문법' },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* 상단 데뷰인 소개 섹션 */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-b from-sky-300 to-sky-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            데뷰인
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-white/90 mb-2">
            최고의 노력과 성과!
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-10">
            데뷰의 학부모, 선생님, 학생들이 인정한 최고의 인재
          </p>
          
          {/* TODO: 트로피 이미지를 public/images/trophy.png 와 같이 준비해주세요. */}
          {/* <Image src="/images/trophy.png" alt="데뷰인 트로피" width={200} height={200} className="mx-auto mb-8" /> */}
          <Trophy className="w-32 h-32 md:w-40 md:h-40 text-yellow-400 mx-auto mb-8 drop-shadow-lg" />

          <div className="max-w-3xl mx-auto">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
              10,000 포인트 달성 시 상장 수여 및 &apos;데뷰인&apos; 등극
            </h2> */}
            <div className="bg-white/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
              <p className="text-md md:text-lg text-gray-700 leading-relaxed text-left">
                영어를 익히는 과정이 순탄했다면 누구나 뛰어난 실력을 갖출 수 있었을 것입니다. 
                하지만 탁월한 영어 실력은 꾸준한 노력과 체계적인 관리가 뒷받침될 때 가능합니다. 
                학습 과정이 결코 쉽지 않음에도 불구하고, 더 높은 목표를 향해 쉼 없이 나아가 뛰어난 성취를 이룬 이들을 
                <span className="font-semibold text-blue-600">&apos;데뷰인&apos;</span>이라 부릅니다. 
                우리는 데뷰인들을 존경하고 기억할 것입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 데뷰인 시상 기준 섹션 추가 */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-10">
            데뷰인 시상 기준
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 초등 데뷰인 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">초등 데뷰인 (6개월 기준)</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>3관왕 (스스보하+아), 성취도 평가 레벨 내 상위 3% 달성</li>
                <li>참고 자료: 3~8월, 9월~2월</li>
              </ul>
            </div>
            {/* 중등 데뷰인 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-sky-600 mb-4">중등 데뷰인 (6개월 기준)</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>3관왕 (스피킹, 아카데믹, 스터디북)</li>
                <li>내신 100, 고1, 고2, 고3 각 90점대 이상 성취도 평가 결과</li>
              </ul>
            </div>
          </div>
          {/* 보상 */}
          {/* <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-yellow-500 mb-4">[보상]</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>포인트: 3만 포인트 + 인터뷰 게시 (수기)</li>
              <li>시상: 초등부 시점과 동일하게 맞춤</li>
            </ul>
          </div> */}
        </div>
      </section>

      {/* 초등부 동기부여 시스템 섹션 */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-4">
            초등부 동기부여 시스템: 데뷰 카드
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            학생들의 성취를 격려하고 꾸준한 노력을 응원하기 위해 특별한 카드를 수여합니다.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* 챔피언 카드 */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-400 flex flex-col">
              <div className="flex items-center mb-4">
                <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-yellow-600">DEBUT CHAMPION</h3>
                  <p className="font-semibold text-gray-700">챔피언에게 수여</p>
                </div>
              </div>
              <blockquote className="text-sm text-gray-600 italic mt-auto">
                <p className="font-bold mb-2">&quot;Champions are not afraid of failure. They take calculated risks.&quot;</p>
                <p>챔피언이란 경기나 일련의 대회에서 모든 상대를 이겨낸 사람 또는 열정적으로 어떤 사람, 믿음, 권리, 또는 원칙을 지지하고, 경쟁하는 사람을 말합니다.</p>
              </blockquote>
            </div>
            {/* 마스터 카드 */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-400 flex flex-col">
              <div className="flex items-center mb-4">
                <Award className="w-12 h-12 text-purple-500 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-purple-600">DEBUT MASTER</h3>
                  <p className="font-semibold text-gray-700">아카데믹 챔피언에게 수여</p>
                </div>
              </div>
              <blockquote className="text-sm text-gray-600 italic mt-auto">
                <p className="font-bold mb-2">&quot;Talents are never enough. Masters always do best in small things.&quot;</p>
                <p>마스터란 해당 분야에서 전문가 수준의 지식과 기술을 보유하고 있으며, 그 분야에서 최고의 성과를 이루어낸 사람을 의미합니다.</p>
              </blockquote>
            </div>
            {/* 미션 카드 */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-400 flex flex-col">
              <div className="flex items-center mb-4">
                <Star className="w-12 h-12 text-green-500 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-green-600">DEBUT MISSION</h3>
                  <p className="font-semibold text-gray-700">매번의 학습 노력을 기울인 학생에게 수여</p>
                </div>
              </div>
              <blockquote className="text-sm text-gray-600 italic mt-auto">
                <p className="font-bold mb-2">&quot;Challenge yourself, but keep it realistic.&quot;</p>
                <p>미션은 조직 개인이 달성하고자 하는 구체적인 목표나 목적을 의미합니다. 미션은 방향성과 목적을 제공하며, 우선순위를 결정하고 의사 결정을 지도하는 데 중요합니다.</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 챔피언 섹션들을 포함할 컨테이너 */}
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-16 flex-grow">
        {/* 아카데믹 챔피언 섹션 (하단으로 이동 및 간소화) */}
        <section id="academic-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-orange-500 mb-1 text-left">
            아카데믹 챔피언
          </h3>
          <div className="mt-1 mb-6 border-b-4 border-orange-400 w-24"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center md:w-1/4">
              <Medal className="w-24 h-24 md:w-32 md:h-32 text-yellow-500 mb-3" />
              <p className="text-lg font-semibold text-gray-700">아카데믹</p>
              <p className="text-sm text-gray-500">(월말 1위)</p>
            </div>
            <div className="md:w-3/4">
              <p className="text-xl md:text-2xl font-semibold text-gray-800">
                Champions are not afraid of failure. They take calculated risks.
              </p>
              <blockquote className="mt-4 p-4 border-l-4 border-gray-300 bg-gray-50 rounded-r-lg">
                <p className="text-md text-gray-600 italic leading-relaxed">
                  &quot;챔피언은 실패를 두려워하지 않습니다. <br />
                  그들은 위험과 어려움이 따른다는 것을 알면서도, <br />
                  끝까지 최선을 다해 노력합니다.&quot;
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* 스스로보하 챔피언 (초등) 섹션 (하단으로 이동) */}
        <section id="suzohaboha-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-gray-200">
          <div className="flex items-center mb-1">
            <span className="bg-green-400 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">초등</span>
            <h3 className="text-2xl md:text-3xl font-bold text-orange-500">
              스스보하 챔피언
            </h3>
          </div>
          <div className="mt-1 mb-6 border-b-4 border-orange-400 w-40"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {suzohabohaItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {item.icon}
                <p className="text-md font-semibold text-gray-700 mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 스스로내하 챔피언 (중등) 섹션 (하단으로 이동) */}
        <section id="suneboha-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-gray-200">
          <div className="flex items-center mb-1">
            <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">중등</span>
            <h3 className="text-2xl md:text-3xl font-bold text-orange-500">
              스내보하 챔피언
            </h3>
          </div>
          <div className="mt-1 mb-6 border-b-4 border-orange-400 w-40"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {sunebohaItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {item.icon}
                <p className="text-md font-semibold text-gray-700 mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* 데뷰인 보러가기 버튼 섹션 */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <a
            href="https://blog.naver.com/ourdebut"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 ease-in-out transform hover:-translate-y-1"
          >
            더 많은 데뷰인 보러 가기 (네이버 블로그)
          </a>
        </div>
      </section>

      {/* 하단 로고 섹션 */}
      <footer className="py-8 bg-blue-700 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
          <Image src="/images/debut_language_school_logo.png" alt="데뷰영어학원 로고" width={50} height={50} className="mr-3 mb-4 md:mb-0" />
          <div>
            <p className="font-semibold text-lg text-center md:text-left">DEBUT LANGUAGE SCHOOL</p>
            <p className="text-md text-center md:text-left">데뷰영어학원</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default DebutianPage; 