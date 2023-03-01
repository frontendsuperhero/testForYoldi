import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/pages/Home.module.scss';
import { MainLayout } from '@/components/Layout/MainLayout';

export default function Profile() {
  return <MainLayout></MainLayout>;
}
