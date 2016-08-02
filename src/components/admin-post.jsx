import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as globalsActions from '../actions/globals'

const admin_article_post = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            category: '',
            content: ''
        }
    },
    componentDidMount() {
        // eslint-disable-next-line
        window.articleEditor = editormd("post-content", {
            width: "100%",
            height: 500,
            markdown: "",
            placeholder: '请输入内容...',
            path: '../static/editor.md/lib/',
            toolbarIcons() {
                return [
                    "bold", "italic", "quote", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "reference-link", "image", "code", "code-block", "table", "|",
                    "watch", "preview", "fullscreen", "|",
                    "help"
                ]
            },
            watch : false,
            saveHTMLToTextarea : true,
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "/api/?action=upload"
        })
    },
    componentDidUpdate(prevProps) {

    },
    handleSubmit(event) {
        event.preventDefault()
        const {setMessage} = this.props
        const {title, category} = this.state
        // eslint-disable-next-line
        const content = articleEditor.getMarkdown()
        if (title === '' || category === '' || content === '') {
            setMessage({
                type: 'error',
                content: '请将表单填写完整!'
            })
            return false
        }
        var data = new FormData(event.target)
        $.ajax({
            contentType: false,
            processData: false,
            data
        }).then(json => {
            if (json.code === 200) {
                setMessage('发布成功!')
                event.target.reset()
            } else {
                setMessage({
                    type: 'error',
                    content: json.message
                })
            }
        })
    },
    handleChange(type, event) {
        this.setState({[type]: event.target.value})
    },
    render() {
        return (
            <div className="g-mn">
                <div className="box">
                    <form onSubmit={this.handleSubmit} id="article-post" action="/api/" method="post">
                        <section id="post-title">
                            <input value={this.state.title} onChange={this.handleChange.bind(this, 'title')} type="text" className="form-control" placeholder="请输入标题" />
                        </section>
                        <section id="post-category">
                            <select value={this.state.category} onChange={this.handleChange.bind(this, 'category')} id="category" name="category" className="form-control">
                                <option value="">请选择分类</option>
                                <option value="1">生活</option>
                                <option value="2">工作</option>
                                <option value="3">其他</option>
                            </select>
                        </section>
                        <section id="post-content">
                            <textarea value={this.state.content} onChange={this.handleChange.bind(this, 'content')} id="editor" name="content" className="form-control hidden" data-autosave="editor-content"></textarea>
                        </section>
                        <section id="post-submit">
                            <input type="hidden" name="action" value="post" />
                            <button className="btn btn-success">发布</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
})
function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(globalsActions, dispatch)
}

export const AdminArticlePost = connect(mapStateToProps, mapDispatchToProps)(admin_article_post)
