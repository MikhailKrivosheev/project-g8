/* eslint-disable react/destructuring-assignment */
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
  content?: ReactNode;
}

interface IState {
  hasError: boolean;
  errorInfo?: string;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.content ? (
        this.props.content
      ) : (
        <Section>
          <Title>Упс! Что-то пошло не так</Title>
        </Section>
      );
    }

    return this.props.children;
  }
}
