import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from "react-icons/ai";

import { DEFAULT_USER } from "@/_mock/assets";
import { useSignIn } from "@/store/userStore";

import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";

const LoginForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ username, password }) => {
    setLoading(true);
    try {
      await signIn({ username, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">
        {t("sys.login.signInFormTitle")}
      </div>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          username: DEFAULT_USER.username,
          password: DEFAULT_USER.password,
        }}
        onFinish={handleFinish}
      >
        <div className="mb-4 flex flex-col">
          <Alert
            type="warning"
            description={
              <div className="flex flex-col">
                <span>{DEFAULT_USER.username}</span>
              </div>
            }
            showIcon
          />
        </div>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: t("sys.login.accountPlaceholder") },
          ]}
        >
          <Input placeholder={t("sys.login.userName")} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t("sys.login.passwordPlaceholder") },
          ]}
        >
          <Input.Password
            type="password"
            placeholder={t("sys.login.password")}
          />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12} className="flex align-middle">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>{t("sys.login.rememberMe")}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <Button
                style={{ padding: 0 }}
                type="link"
                className="underline"
                onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              >
                {t("sys.login.forgetPassword")}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            {t("sys.login.loginButton")}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col span={9} flex="1">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.MOBILE)}
            >
              {t("sys.login.mobileSignInFormTitle")}
            </Button>
          </Col>
          <Col span={9} flex="1">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.QR_CODE)}
            >
              {t("sys.login.qrSignInFormTitle")}
            </Button>
          </Col>
          <Col
            span={6}
            flex="1"
            onClick={() => setLoginState(LoginStateEnum.REGISTER)}
          >
            <Button className="w-full !text-sm">
              {t("sys.login.signUpFormTitle")}
            </Button>
          </Col>
        </Row>

        <Divider className="!text-xs">{t("sys.login.otherSignIn")}</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub />
          <AiFillWechat />
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
