import React, { BaseSyntheticEvent, DetailedHTMLProps, FormEventHandler, FormHTMLAttributes } from "react"
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import styles from "./edit-profile.module.css";
import { patchUser } from "../../services/thunk/patchUser";
import { getUser } from "../../services/thunk/getUser";

export const EditProfile = () => {
  const {user} = useSelector(state=> state.profile)
  const [nameValue, setNameValue] = React.useState(user.name)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const [emailValue, setEmailValue] = React.useState(user.email)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const [passValue, setPassValue] = React.useState('')
  const passRef = React.useRef<HTMLInputElement>(null)

  const [nameIsEdit, setNameIsEdit] = React.useState(true)
  const [emailIsEdit, setEmailIsEdit] = React.useState(true)
  const [passIsEdit, setPassIsEdit] = React.useState(true)

  const dispatch = useDispatch();

  const onNameIconClick = () => {
    setTimeout(() => nameRef?.current?.focus(), 0)
    setNameIsEdit(!nameIsEdit)
  }

  const onEmailIconClick = () => {
    setTimeout(() => emailRef?.current?.focus(), 0)
    setEmailIsEdit(!emailIsEdit)
  }

  const onPassIconClick = () => {
    setTimeout(() => passRef?.current?.focus(), 0)
    setPassIsEdit(!passIsEdit)
  }
  
  const cancel = () => {
    setNameValue(user.name);
    setNameIsEdit(true)
    setEmailValue(user.email);
    setEmailIsEdit(true)
    setPassValue('')
    setPassIsEdit(true)
  }

  const saveChanges = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(e)
    dispatch(patchUser({email: emailValue, name: nameValue, password: passValue}))
    setNameIsEdit(true)
    setEmailIsEdit(true)
    setPassIsEdit(true)
    dispatch(getUser())
    setPassValue('')
  }

  return (
    <form className={`${styles['input-fields']} mt-30 pr-30 mr-30`} onSubmit={saveChanges}>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'??????'}
          onChange={e => setNameValue(e.target.value)}
          icon={nameIsEdit?'EditIcon': 'CloseIcon'}
          value={nameValue}
          name={'name'}
          error={false}
          ref={nameRef}
          onIconClick={onNameIconClick}
          errorText={'????????????'}
          size={'default'}
          disabled={nameIsEdit}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'email'}
          placeholder={'??????????'}
          onChange={e => setEmailValue(e.target.value)}
          icon={emailIsEdit ? 'EditIcon': 'CloseIcon'}
          value={emailValue}
          name={'email'}
          error={false}
          ref={emailRef}
          onIconClick={onEmailIconClick}
          errorText={'????????????'}
          size={'default'}
          disabled={emailIsEdit}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'password'}
          placeholder={'????????????'}
          onChange={e => setPassValue(e.target.value)}
          icon={passIsEdit ? 'EditIcon': 'CloseIcon'}
          value={passValue}
          name={'password'}
          error={false}
          ref={passRef}
          onIconClick={onPassIconClick}
          errorText={'????????????'}
          size={'default'}
          disabled={passIsEdit}
        />
      </div>
      { nameValue !== user.name || emailValue !== user.email || passValue.length > 0 ? (
        <div className={`${styles.buttons}`}>
          <Button type="primary" size="medium" >
            ??????????????????
          </Button>
          <div className={`${styles['cancel-button']}`}>
            <Button type="secondary" size="medium" onClick={cancel}>
              ????????????
            </Button>
          </div>
        </div>) 
        : null
      }
    </form>
  )
}