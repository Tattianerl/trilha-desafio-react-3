import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
`;

export const TitleSignup = styled.h3`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
`;

export const SubtitleSignup = styled.p`
    font-size: 18px;
    margin-bottom: 30px;
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
`;
